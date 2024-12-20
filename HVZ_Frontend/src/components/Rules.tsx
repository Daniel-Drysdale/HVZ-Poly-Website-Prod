import Rules_Slides from "../assets/FA24_Rules_Slides.pdf"; // Adjust the path as necessary

const Rules = () => {
  return (
    <div style={{ width: "100%", height: "100rem", top: "100px" }}>
      <embed
        src={Rules_Slides}
        type="application/pdf"
        width="100%"
        height="100%"
        style={{ border: "none" }}
      />
    </div>
  );
};

export default Rules;
