import Rules_Slides from "../assets/FA24_Rules_Slides.pdf"; // Adjust the path as necessary

const Rules = () => {
  return (
    <div style={{ width: "100%", height: "100vw", top: "10000px" }}>
      <embed
        src={Rules_Slides}
        type="application/pdf"
        width="100%"
        height="100%"
        style={{ border: "none" }} // Optional: Remove border
      />
    </div>
  );
};

export default Rules;
