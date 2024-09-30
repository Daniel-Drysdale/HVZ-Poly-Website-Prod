import "./App.css";
import Tabs from "./components/Tabs.tsx";
import Logo from "./components/Logo.tsx";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <div>
        <Logo />
        <Tabs />
      </div>
    </>
  );
}

export default App;
