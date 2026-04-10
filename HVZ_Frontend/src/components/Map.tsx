import Map_Image from "../assets/Map.png"; //Adjust the path as necessary in the future

const Map = () => {
  return (
    <div className="center-div" style={{ paddingTop: "20px" }}>
      <center>
        <h3 className="overlay-text">[SPRING 2026]</h3>
        <div style={{ paddingTop: "20px" }}>
          <img
            style={{
              width: "80%",
              height: "80%",
            }}
            src={Map_Image}
          ></img>
        </div>
      </center>
    </div>
  );
};

export default Map;
