import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../assets/Loading.gif";
import DisplayBadges from "./DisplayBadges";
import LoadBadges from "./LoadBadges";
import type { Player, Badge } from "./CustomTypes";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

function PlayerTable() {
  const navigate = useNavigate();

  //Acts as a stand-in to show that the list in being loaded
  const loadingData: Player[] = [
    {
      id: 0,
      name: "Loading...",
      status: -1,
      tags: "...",
      image: "Loading",
      badgeIds: [],
      named_tags: "",
    },
  ];

  const badges: Badge[] = LoadBadges();

  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const [ItemsPerPage, setItemsPerPage] = useState<number>(10);

  const [totalPlayers, setTotalPlayers] = useState(0);

  let totalPages = 1;

  totalPages = Math.ceil(totalPlayers / ItemsPerPage);

  totalPages = Math.ceil(totalPlayers / ItemsPerPage);

  const [playerList, setPlayerList] = useState<Player[]>([
    //data defaulted to "loading"
    {
      id: 0,
      name: "Loading...",
      status: -1,
      tags: "...",
      image: "Loading",
      badgeIds: [],
      named_tags: "",
    },
  ]);

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

  const handleItemsPerPage = (itemNum: number) => {
    setItemsPerPage(itemNum);
  };

  const isClickable = (isLoading: boolean) => {
    if (isLoading === true) {
      return "";
    }
    return "clickable-row";
  };

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        setIsLoading(true);
        setPlayerList(loadingData); //while grabbing the new data, set to loading
        const response = await fetch(
          `${BASE_URL}v2/api/PageList/?pageSize=${ItemsPerPage}&page=${currentPage}`, //fetch data using query params
          {
            method: "GET",
          },
        );

        if (response.status !== 200) {
          throw new Error("Error in Fetch, Status is " + response.status);
        }

        const backendData = await response.json();

        setPlayerList(backendData.data || []); //Sets data to be the fetched data, defaults to an empty array
        setTotalPlayers(backendData.playerCount || 1); //Sets total playercount
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlayerData();
  }, [currentPage, ItemsPerPage]);

  return (
    <div style={{ marginTop: "-10px", marginBottom: "20px" }}>
      <div style={{ width: "100%" }}>
        <table className="table table-dark text-center">
          <thead>
            <tr>
              <th style={{ width: "10vw", minWidth: "100px" }}>Image</th>
              <th style={{ minWidth: "15px", maxWidth: "150px" }}>Name</th>
              <th style={{ width: "1rem" }}>Status</th>
              <th>Tags</th>
              <th style={{ maxWidth: "200px" }}>Badges</th>
            </tr>
          </thead>
          <tbody>
            {playerList.map((player) => (
              <tr
                key={player.id}
                className={`${isClickable(isLoading)} ${Display_Status(player.status)}`}
                onClick={() => navigate(`/profile/${player.name}`)}
              >
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
                    maxWidth: "px",
                  }}
                >
                  {player.name}
                </td>
                <td
                  className="text-table"
                  style={{
                    paddingTop: "25px",
                    paddingBottom: "25px",
                    maxWidth: "150px",
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

                <td style={{ maxWidth: "200px", maxHeight: "100px" }}>
                  <div
                    style={{
                      marginTop: "1.vh",
                      marginBottom: "auto",
                      justifyContent: "center",
                    }}
                  >
                    <center>
                      <DisplayBadges
                        badges={badges}
                        player_badges={player.badgeIds}
                      />
                    </center>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className=" center-div">
          <div className="col mx-5 pagination-controls center-div">
            <button
              onClick={handlePrevious}
              disabled={
                currentPage === 1 ||
                playerList === loadingData ||
                currentPage === 0
              }
            >
              Prev
            </button>
            <span
              style={{
                color: "white",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >{`Page ${currentPage} of ${
              totalPages === 0 ? 1 : totalPages
            }`}</span>
            <button
              onClick={handleNext}
              disabled={currentPage >= totalPages || playerList === loadingData}
            >
              Next
            </button>
          </div>

          <div className="center-div">
            <center>
              <div className="center-div">
                <p
                  className=" white col"
                  style={{
                    minWidth: "150px",
                    paddingTop: "10px",
                    marginLeft: "10px",
                    marginRight: "5px",
                    color: "white",
                  }}
                >
                  Items Per Page:
                </p>
              </div>
            </center>
            <div className="center-div">
              <button
                className="col "
                onClick={() => handleItemsPerPage(5)}
                disabled={ItemsPerPage == 5}
                style={{ height: "10%" }}
              >
                5
              </button>
              <button
                className="col"
                onClick={() => handleItemsPerPage(10)}
                disabled={ItemsPerPage == 10}
                style={{ height: "10%" }}
              >
                10
              </button>
              <button
                className="col"
                onClick={() => handleItemsPerPage(15)}
                disabled={ItemsPerPage == 15}
                style={{ height: "10%" }}
              >
                15
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//Displays Differing colors based on player statuses
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
    case 4:
      return "table-secondary";
    default:
      return "";
  }
}

//Displays Differing Status names based on player statuses
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
    case 4:
      return "THE CHAIR";
    default:
      return "Loading...";
  }
}

export default PlayerTable;
