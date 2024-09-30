import Circle_logo from "../assets/Circle_logo.png";

function Logo() {
  return (
    <>
      <img
        src={Circle_logo}
        className=""
        style={{
          minWidth: "1vw",
          maxWidth: "80px",
          position: "absolute",
          marginLeft: "10px",
          top: "0vw",
          marginTop: "10px",
        }}
      ></img>
    </>
  );
}

export default Logo;
