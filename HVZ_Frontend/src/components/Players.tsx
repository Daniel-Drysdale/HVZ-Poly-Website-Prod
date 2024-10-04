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
  const [data, setData] = useState<Player[]>([
    {
      id: 0,
      name: "Loading...",
      status: -1,
      tags: "...",
      image: "Loading",
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setData;
    const fetchPlayerData = async () => {
      try {
        const response = await fetch(BASE_URL + "api/player_list/", {
          method: "GET",
        });

        if (response.status !== 200) {
          throw new Error("Error in Fetch, Status is " + response.status);
        }

        const backendData = await response.json();
        setData(backendData || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlayerData();
  }, []);

  const indexOfLastPlayer = currentPage * itemsPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - itemsPerPage;
  const currentPlayers = data.slice(indexOfFirstPlayer, indexOfLastPlayer);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
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
            <th
              className=""
              style={{ minWidth: "200px", width: "25vw", marginTop: "110px" }}
            >
              Name
            </th>
            <th>Team</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {currentPlayers.map((player) => (
            <tr
              key={player.id}
              className={player.status === 1 ? "table-success" : "table-danger"}
            >
              <td>
                {player.image !== "Loading" && (
                  <img
                    src={player.image}
                    alt={player.name}
                    style={{ width: "7vw", height: "6vw" }}
                  />
                )}
                {player.image === "Loading" && (
                  <img
                    src={Loading}
                    alt={player.name}
                    style={{ width: "7vw", height: "6vw" }}
                  />
                )}
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
                {player.status > 0 ? "Zombie" : "Human"}
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
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <span
          style={{ color: "white", marginLeft: "10px", marginRight: "10px" }}
        >{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Players;
