import { useEffect, useState } from "react";
import { Player, Badge } from "./CustomTypes";
import LoadingGif from "../assets/Loading.gif";
import LoadBadges from "./LoadBadges";
import DisplayBadges from "./DisplayBadges";
type ProfileProps = {
  player_name: string;
};

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

function Profile({ player_name }: ProfileProps) {
  const badges: Badge[] = LoadBadges();

  const [player, setPlayer] = useState<Player>({
    id: -1,
    name: player_name,
    status: -1,
    tags: "...",
    image: "Loading",
    named_tags: "",
    badgeIds: [],
  });

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const responseProfile = await fetch(
          `${BASE_URL}v2/api/get_player_profile/?name=${decodeURIComponent(player_name)}`,
          { method: "GET" },
        );

        if (!responseProfile.ok) {
          throw new Error(
            "Error in Fetch, Status is " + responseProfile.status,
          );
        }

        const backendData = await responseProfile.json();
        const player_profile: Player = backendData.data.player;
        setPlayer(player_profile);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPlayerData();
  }, [player_name]);

  //Displays Differing colors based on player statuses
  function StatusBackgroundColor(status: Number) {
    switch (status) {
      case 0:
        return "profile-human";
      case 1:
        return "profile-zombie";
      case 2:
        return "profile-oz";
      case 3:
        return "profile-mod";
      case 4:
        return "profile-cam-chair";
      default:
        return "";
    }
  }

  //Displays Differing texts based on player statuses
  function StatusName(status: Number) {
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
        return "Cam Chair";
      default:
        return "";
    }
  }

  return (
    <div style={{ paddingTop: "5px" }}>
      <div className="center-div">
        <img
          style={{ width: "30vh", borderRadius: "10px" }}
          className={StatusBackgroundColor(player.status)}
          src={player.image !== "Loading" ? player.image : LoadingGif}
          alt={player.name}
        />
      </div>
      <div
        style={{
          textAlign: "center",
          marginTop: "15px",
        }}
        className="profile-text"
      >
        <span
          className={StatusBackgroundColor(player.status)}
          style={{
            width: "100vw",
            maxWidth: "300px",
            borderRadius: "10px",
            marginTop: "10px",
            padding: "7.5px",
            fontSize: "2.5vh",
            backgroundColor: "black",
          }}
        >
          {player.name}
        </span>
        <div
          className="row justify-content-center g-1"
          style={{ marginTop: "20px" }}
        >
          <div
            className={`col auto ${StatusBackgroundColor(player.status)}`}
            style={{
              backgroundColor: "black",
              fontSize: "2vh",
              borderRadius: "10px",
              marginTop: "10px",
              marginRight: "5px",
              maxWidth: "220px",
              minWidth: "200px",
            }}
          >
            <div style={{}}>
              <u>Player Status</u>
            </div>
            <span>{StatusName(player.status)}</span>
          </div>

          <div
            className={`col auto ${StatusBackgroundColor(player.status)}`}
            style={{
              backgroundColor: "black",
              borderRadius: "10px",
              fontSize: "2vh",
              marginTop: "10px",
              marginLeft: "5px",
              maxWidth: "220px",
              minWidth: "200px",
            }}
          >
            <div>
              <u>Number of Tags</u>
            </div>
            <span className="profile">
              [ <b>{player.tags} </b>]
            </span>
          </div>
        </div>
        <div className="center-div" style={{ borderRadius: "10px" }}>
          <div
            className={StatusBackgroundColor(player.status)}
            style={{
              marginTop: "5vh",
              backgroundColor: "black",
              width: "40vw",
              borderRadius: "10px",
            }}
          >
            <u>Badges </u>
            <div style={{ marginTop: "10px" }}>
              <DisplayBadges
                badges={badges}
                player_badges={player.badgeIds}
              ></DisplayBadges>
            </div>
          </div>
        </div>
        <div className="center-div">
          <div
            className={StatusBackgroundColor(player.status)}
            style={{
              marginTop: "5vh",
              backgroundColor: "black",
              width: "40vw",
              borderRadius: "10px",
            }}
          >
            <u>Tagged: </u>
            <div style={{ marginTop: "10px" }}>{player.named_tags}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
