import Rules_Slides from "../assets/FA24_Rules_Slides.pdf"; // Adjust the path as necessary

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
      }}
    >
      <object
        data={Rules_Slides}
        type="application/pdf"
        width="100%"
        height="100%"
        style={{ border: "none" }}
      >
        <p className="center-div" style={{ fontSize: "5vw", color: "white" }}>
          Cannot load rule slides on mobile
        </p>

        <p className="center-div" style={{ fontSize: "5vw", color: "white" }}>
          Please use a Desktop to view the Rules
        </p>
      </object>
    </div>
  );
};

export default Rules;
