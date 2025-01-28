import { useEffect, useState } from "react";
import H_Rect from "../assets/Human_Rect.png";
import Z_Rect from "../assets/Zombie_Rect.png";

type MVZ = {
  name: string;
  tags: string;
};

const Home = () => {
  const [Data, setData] = useState<any>({
    humans: "...",
    zombies: "...",
  });

  const [MVZ, SetMVZ] = useState<MVZ[]>([]);

  const BASE_URL = import.meta.env.VITE_BASE_API_URL;

  useEffect(() => {
    const fetch_counter = async () => {
      try {
        const responsePCount = await fetch(BASE_URL + "v2/api/count/", {
          method: "GET",
        });

        const responseMVZ = await fetch(BASE_URL + "v2/api/mvz/", {
          method: "GET",
        });

        if (responsePCount.status !== 200) {
          throw new Error("Error in Fetch, Status is " + responsePCount.status);
        }
        if (responseMVZ.status !== 200) {
          throw new Error("Error in Fetch, Status is " + responseMVZ.status);
        }

        const backendData = await responsePCount.json();
        const MvZData = await responseMVZ.json();

        setData(backendData.data);
        SetMVZ(MvZData.players);
      } catch (error) {
        console.log(error);
      }
    };

    fetch_counter();

    const intervalId = setInterval(() => {
      fetch_counter();
    }, 120000);

    return () => clearInterval(intervalId);
  }, []);

  const Players = Data;
  const MVZ_List = MVZ;

  return (
    <div>
      <center>
        <div
          className="row"
          style={{
            paddingTop: "2rem",
            minWidth: "10rem",
            display: "flex",
            marginInline: "10%",
          }}
        >
          <div className="col position-relative">
            <img
              className="row"
              src={H_Rect}
              style={{ width: "30vw", minWidth: "100px" }}
              alt="Human_Background"
            />
            <div
              className="overlay-text large-text center-div"
              style={{ top: "11.5vw", left: "20vw" }}
            >
              {Players.humans}
            </div>
            <div
              className="overlay-text small-text"
              style={{ top: "19.5vw", left: "20vw", width: "1000%" }}
            >
              Humans Remaining
            </div>
          </div>

          <div className="col position-relative">
            <img
              className="row"
              src={Z_Rect}
              style={{ width: "30vw", minWidth: "100px" }}
              alt="Zombie_Background"
            />
            <div
              className="overlay-text large-text center-div"
              style={{ top: "11.5vw", left: "20.9vw" }}
            >
              {Players.zombies}
            </div>
            <div
              className="overlay-text small-text center-div"
              style={{ top: "19.5vw", left: "20vw", minWidth: "1000px" }}
            >
              Zombies Hunting
            </div>
          </div>
        </div>
      </center>
      <h3
        className="center-div"
        style={{
          paddingTop: "50px",
          paddingBottom: "10px",
          fontFamily: "monospace",
          color: "white",
        }}
      >
        Top 3 Zombies
      </h3>
      <table
        className="table table-dark text-center"
        style={{
          marginTop: "3vw",
          width: "50%",
          margin: "auto",
        }}
      >
        <thead>
          <tr></tr>
        </thead>
        <tbody>
          {MVZ_List.map((player, index) => (
            <tr key={index}>
              {}
              <td
                className=""
                style={{
                  paddingTop: "25px",
                  paddingBottom: "25px",
                  fontSize: "2vw",
                }}
              >
                [ {player.name} ] tagged {player.tags} humans
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
