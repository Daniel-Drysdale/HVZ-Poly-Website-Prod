import Rules_Slides from "../assets/FA24_Rules_Slides.pdf"; // Adjust the path as necessary

const Rules = () => {
  return (
    <div>
      <embed
        src={Rules_Slides}
        type="application/pdf"
        width="100%"
        height="800px"
        style={{ border: "none" }} // Optional: Remove border
      />
    </div>
  );
};

export default Rules;
