import Circle_logo from "../assets/Circle_logo.png";
function Logo() {
  return (
    <>
      <img
        src={Circle_logo}
        className=""
        style={{
          minWidth: ".5%",
          maxWidth: "75px",
          position: "absolute",
          marginLeft: "5px",
          top: "-8px",
          marginTop: "10px",
        }}
      ></img>
    </>
  );
}

export default Logo;
