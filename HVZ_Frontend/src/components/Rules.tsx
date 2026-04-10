import Rules_Slides from "../assets/rules.pdf"; // Adjust the path as necessary

const Rules = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        padding: "20px",
        marginTop: "-30px",
      }}
    >
      <iframe
        src={Rules_Slides}
        width="100%"
        height="100%"
        style={{ border: "none" }}
      >
        <p className="center-div" style={{ fontSize: "5vw", color: "white" }}>
          Error, Could not load rules slides!
        </p>

        <p className="center-div" style={{ fontSize: "5vw", color: "white" }}>
          Desktop is more stable, try there.
        </p>
      </iframe>
    </div>
  );
};

export default Rules;
