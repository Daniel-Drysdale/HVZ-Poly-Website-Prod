import QR_Code from "../assets/Nerf-Tech-QR.png";

function Links() {
  return (
    <>
      <div className="center-div font-type">
        <header
          style={{
            fontSize: "1.5vw",
            marginTop: "11vw",
            marginBottom: "2vw",
            color: "white",
          }}
        >
          QR Code to the Nerf-Tech Discord Here
        </header>
        <div className="center-div">
          <img src={QR_Code} className="" style={{ width: "15vw" }}></img>
        </div>
      </div>
    </>
  );
}

export default Links;
