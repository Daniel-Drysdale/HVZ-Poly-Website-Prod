import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

type Player = {
  id: string;
  name: string;
  status: number;
  tags: number;
  image: string;
};

function Players() {
  const [data, setData] = useState<Player[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await fetch(
          BASE_URL + "/v2/weblite/HVZ_POLY/Player_Data",
          {
            method: "GET",
            headers: {
              Authorization:
                "Bearer sqlitecloud://npb09elghz.sqlite.cloud:8860?apikey=" +
                API_KEY,
            },
          }
        );

        if (response.status !== 200) {
          throw new Error("Error in Fetch, Status is " + response.status);
        }

        const backendData = await response.json();
        setData(backendData.data || []);
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
      <table className="table table-dark  text-center">
        <thead>
          <tr>
            <th style={{ width: "15vw", marginLeft: "10vw" }}>Player Image</th>
            <th style={{ width: "400px", top: "10px" }}>Name</th>
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
                <img
                  src={player.image}
                  alt={player.name}
                  style={{ width: "7vw" }}
                />
              </td>
              <td className="text-table">{player.name}</td>
              <td className="text-table">
                {player.status > 0 ? "Zombie" : "Human"}
              </td>
              <td className="text-table">{player.tags}</td>
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
