import Rules_Slides from "../assets/rules.pdf";

const Rules = () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const openRules = () => {
    window.open(Rules_Slides, "_blank");
  };

  if (isMobile) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <button className="btn btn-primary" onClick={openRules}>
          Open Rules PDF
        </button>
      </div>
    );
  }

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
        title="Rules PDF"
      />
    </div>
  );
};

export default Rules;
