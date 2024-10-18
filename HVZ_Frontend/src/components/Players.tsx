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
  const [data, setData] = useState<Player[]>([
    {
      id: 0,
      name: "Loading...",
      status: -1,
      tags: "...",
      image: "Loading",
    },
  ]);
  const itemsPerPage = 5;
  const [totalItems, setTotalItems] = useState(0);
  let totalPages = 1;

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        setData(loadingData);
        const response = await fetch(
          `${BASE_URL}v2/api/PageList/?page=${currentPage}`,
          {
            method: "GET",
          }
        );

        if (response.status !== 200) {
          throw new Error("Error in Fetch, Status is " + response.status);
        }

        const backendData = await response.json();
        setData(backendData.data || []);
        setTotalItems(backendData.playerCount || 1);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlayerData();
  }, [currentPage]);

  totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <table className="table table-dark text-center">
        <thead>
          <tr>
            <th
              style={{ width: "15vw", marginLeft: "10vw", minWidth: "150px" }}
            >
              Player Image
            </th>
            <th style={{ minWidth: "200px", width: "25vw" }}>Name</th>
            <th>Team</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {data.map((player) => (
            <tr key={player.id} className={Display_Status(player.status)}>
              <td>
                <img
                  src={player.image !== "Loading" ? player.image : Loading}
                  alt={player.name}
                  style={{ width: "7vw", height: "6vw" }}
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
            currentPage === 1 || data === loadingData || currentPage === 0
          }
        >
          Previous
        </button>
        <span
          style={{ color: "white", marginLeft: "10px", marginRight: "10px" }}
        >{`Page ${currentPage} of ${totalPages === 0 ? 1 : totalPages}`}</span>
        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages || data === loadingData}
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
