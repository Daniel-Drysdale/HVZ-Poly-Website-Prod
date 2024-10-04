import { useEffect, useState } from "react";
import H_Rect from "../assets/Human_Rect.png";
import Z_Rect from "../assets/Zombie_Rect.png";

const Home = () => {
  const [Data, setData] = useState<any>(0);

  const BASE_URL = import.meta.env.VITE_BASE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetch_counter = async () => {
      //Fetchs the counter from the Backend
      try {
        const response = await fetch(BASE_URL + "/v2/functions/Home_Count", {
          method: "GET",
          headers: {
            Authorization:
              "Bearer sqlitecloud://npb09elghz.sqlite.cloud:8860?apikey=" +
              API_KEY,
          },
        });

        if (response.status != 200) {
          //If the response code isn't 200 (aka, if something bad happend), throw
          throw "Error in Fetch, Status is " + response.status;
        }

        const backendData = await response.json();

        setData(backendData.data);
      } catch (error) {
        //catches and prints error
        console.log(error);
      }
    };
    fetch_counter();
  }, []);

  const Players = Data;

  return (
    <div
      className="row"
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: "8vw",
        paddingTop: "5vw",
        minWidth: "500px",
        display: "flex",
      }}
    >
      <div className="col position-relative">
        <img
          className="col"
          src={H_Rect}
          style={{ width: "35vw" }}
          alt="Human_Background"
        />
        <div
          className="overlay-text large-text "
          style={{ top: "11.5vw", left: "19vw" }}
        >
          {Players.humans}
        </div>
        <div
          className="overlay-text small-text"
          style={{ top: "18.5vw", left: "19vw" }}
        >
          Humans Remaining
        </div>
      </div>

      <div className="col position-relative">
        <img
          className="col"
          src={Z_Rect}
          style={{ width: "35vw", minWidth: "10vw" }}
          alt="Zombie_Background"
        />

        <div
          className="overlay-text large-text"
          style={{ top: "11.5vw", left: "19vw" }}
        >
          {Players.zombies}
        </div>

        <div
          className="overlay-text small-text"
          style={{ top: "18.5vw", left: "19vw" }}
        >
          Zombies Hunting
        </div>
      </div>
    </div>
  );
};

export default Home;