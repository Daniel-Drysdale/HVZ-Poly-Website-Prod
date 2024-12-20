import "./App.css";
import Tabs from "./components/Tabs.tsx";
import Logo from "./components/Logo.tsx";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <div style={{ width: "100%" }}>
        <div style={{ width: "10%" }}>
          <Logo />
        </div>
        <Tabs />
      </div>
    </>
  );
}

export default App;
