import QR_Code from "../assets/Nerf-Tech-QR.png";
import Youtube_Logo from "../assets/youtube_image.png";

function Links() {
  return (
    <>
      <div>
        <ul
          style={{
            display: "flex",
            listStyleType: "none",
            paddingTop: "3vw",
          }}
        >
          <div className="col">
            <li className="center-div" style={{}}>
              <div className="font-type">
                <header
                  style={{
                    fontSize: "1.5vw",
                    marginBottom: "2vw",
                    color: "white",
                  }}
                >
                  \\\\ QR Code to the Nerf-Tech Discord Here \\\\
                </header>
                <div className="center-div">
                  <img
                    src={QR_Code}
                    alt="QR Code for Nerf-Tech Discord"
                    className="qr-code"
                    style={{ width: "15vw" }}
                  ></img>
                </div>
              </div>
            </li>
          </div>
          <div className="col">
            <li className="center-div">
              <div className="font-type">
                <header
                  style={{
                    fontSize: "1.5vw",
                    marginBottom: "2vw",
                    color: "white",
                  }}
                >
                  //// Link to NerfTech's Youtube Channel ////
                </header>
                <div className="center-div">
                  <a href="https://www.youtube.com/@floridapolytechnicnerftech5966">
                    <img
                      src={Youtube_Logo}
                      alt={"Youtube Link"}
                      style={{ width: "30vw" }}
                    />
                  </a>
                </div>
              </div>
            </li>
          </div>
        </ul>
        <div className="center-div font-type" style={{ paddingTop: "1vw" }}>
          <header
            className="center-div"
            style={{
              fontSize: "1.5vw",
              marginBottom: "2vw",
              color: "white",
            }}
          >
            \\\\ Latest HVZ Trailer Here ////
          </header>
          <div className="center-div">
            <iframe
              width="50%"
              height="50%"
              allowFullScreen
              src="https://www.youtube.com/embed/UGppN5ZWcwU"
              style={{ minWidth: "500px", width: "100%", height: "40vh" }}
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}

export default Links;
