import { useEffect, useState } from "react";
import Loading from "../assets/Loading.gif";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

type Player = {
  id: number;
  name: string;
  status: number;
  tags: string;
  image: string;
};

function Players() {
  //Acts as a stand-in to show that the list in being loaded
  const loadingData: Player[] = [
    {
      id: 0,
      name: "Loading...",
      status: -1,
      tags: "...",
      image: "Loading",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [playerList, setPlayerList] = useState<Player[]>([
    //data defaulted to "loading"
    {
      id: 0,
      name: "Loading...",
      status: -1,
      tags: "...",
      image: "Loading",
    },
  ]);
  const itemsPerPage = 5; // <-- eventually needs to be changed to be a get param and have a button to change
  const [totalPlayers, setTotalPlayers] = useState(0);
  let totalPages = 1;

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        setPlayerList(loadingData); //while grabbing the new data, set to loading
        const response = await fetch(
          `${BASE_URL}v2/api/PageList/?page=${currentPage}`, //fetch data using current page param
          {
            method: "GET",
          }
        );

        if (response.status !== 200) {
          throw new Error("Error in Fetch, Status is " + response.status);
        }

        const backendData = await response.json();

        setPlayerList(backendData.data || []); //Sets data to be the fetched data, defaults to an empty array
        setTotalPlayers(backendData.playerCount || 1); //Sets total playercount
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlayerData();
  }, [currentPage]);

  totalPages = Math.ceil(totalPlayers / itemsPerPage);

  const handleNext = () => {
    //Handles clicking next on the page buttons below the list
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    //Handles clicking prev on the page buttons below the list
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <table className="table table-dark text-center">
        <thead>
          <tr>
            <th
              style={{ width: "1rem", marginLeft: "10vw", minWidth: "130px" }}
            >
              Player Image
            </th>
            <th style={{ minWidth: "50px", width: "" }}>Name</th>
            <th>Team</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {playerList.map((player) => (
            <tr key={player.id} className={Display_Status(player.status)}>
              <td>
                <img
                  src={player.image !== "Loading" ? player.image : Loading}
                  alt={player.name}
                  style={{ width: "65%", height: "65%" }}
                />
              </td>
              <td
                className="text-table"
                style={{
                  paddingTop: "25px",
                  paddingBottom: "25px",
                }}
              >
                {player.name}
              </td>
              <td
                className="text-table"
                style={{
                  paddingTop: "25px",
                  paddingBottom: "25px",
                }}
              >
                {Status_Text(player.status)}
              </td>
              <td
                className="text-table"
                style={{
                  paddingTop: "25px",
                  paddingBottom: "25px",
                }}
              >
                {player.tags}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-controls center-div">
        <button
          onClick={handlePrevious}
          disabled={
            currentPage === 1 || playerList === loadingData || currentPage === 0
          }
        >
          Previous
        </button>
        <span
          style={{ color: "white", marginLeft: "10px", marginRight: "10px" }}
        >{`Page ${currentPage} of ${totalPages === 0 ? 1 : totalPages}`}</span>
        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages || playerList === loadingData}
        >
          Next
        </button>
      </div>
    </div>
  );
}

function Display_Status(status: Number) {
  switch (status) {
    case 0:
      return "table-danger";
    case 1:
      return "table-success";
    case 2:
      return "table-warning";
    case 3:
      return "table-info";
    default:
      return "";
  }
}

function Status_Text(status: Number) {
  switch (status) {
    case 0:
      return "Human";
    case 1:
      return "Zombie";
    case 2:
      return "OZ";
    case 3:
      return "Moderator";
    default:
      return "Loading...";
  }
}

export default Players;
