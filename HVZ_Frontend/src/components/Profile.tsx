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
          className={`profile-element ${StatusBackgroundColor(player.status)}`}
          style={{
            padding: "10px",
            marginTop: "30px",
            fontSize: "2.5vh",
          }}
        >
          {player.name}
        </span>
        <div
          className="row justify-content-center g-1"
          style={{ marginTop: "15px" }}
        >
          <div
            className={`profile-element-row col auto ${StatusBackgroundColor(player.status)}`}
          >
            <div>
              <u>Player Status</u>
            </div>
            <span>{StatusName(player.status)}</span>
          </div>

          <div
            className={`profile-element-row col auto ${StatusBackgroundColor(player.status)}`}
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
            className={`profile-element ${StatusBackgroundColor(player.status)}`}
            style={{
              minWidth: "50px",
              width: "50vh",
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
            className={`profile-element ${StatusBackgroundColor(player.status)}`}
            style={{ width: "40vh" }}
          >
            <u>Tagged: </u>
            <div
              style={{
                fontSize: "1.5vh",
                marginTop: "5px",
                marginBottom: "px",
              }}
            >
              {player.named_tags === "" ? (
                <>No tags currently</>
              ) : (
                <>{player.named_tags}</>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
