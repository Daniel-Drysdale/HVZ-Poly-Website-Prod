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
    <div style={{ marginTop: "20px" }}>
      <center>
        <div
          className="row justify-content-center"
          style={{ marginInline: "10%" }}
        >
          <div className="col-auto position-relative text-center">
            <img
              src={H_Rect}
              style={{ width: "30vw", minWidth: "100px" }}
              alt="Human_Background"
            />
            <div className="overlay-div" style={{ color: "white" }}>
              <div className="overlay-text large-text">{Players.humans}</div>
              <div className="overlay-text small-text">Humans Remaining</div>
            </div>
          </div>

          <div className="col-auto position-relative text-center">
            <img
              src={Z_Rect}
              style={{ width: "30vw", minWidth: "100px" }}
              alt="Zombie_Background"
              className="img-fluid"
            />
            <div className="overlay-div" style={{ color: "white" }}>
              <div className="overlay-text large-text">{Players.zombies}</div>
              <div className="overlay-text small-text">Zombies Hunting</div>
            </div>
          </div>
        </div>
      </center>

      <h3
        className="center-div"
        style={{
          paddingTop: "25px",
          paddingBottom: "10px",
          color: "white",
          fontSize: "1.7vw",
          fontFamily: "monospace",
        }}
      >
        ++ Top 3 Zombies ++
      </h3>

      <table
        className="table table-dark text-center "
        style={{ marginTop: "1vw", width: "50%", margin: "auto" }}
      >
        <thead>
          <tr></tr>
        </thead>
        <tbody>
          {MVZ_List.map((player, index) => (
            <tr key={index}>
              <td
                style={{
                  paddingTop: "30px",
                  paddingBottom: "25px",
                  fontSize: "1.5vw",
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
