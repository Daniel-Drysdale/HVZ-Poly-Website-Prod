import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Logo from "./components/Logo.tsx";
import StaggeredDropDown from "./components/StaggeredDropdown.tsx";
import Home from "./components/Home.tsx";
import PlayerTable from "./components/PlayerTable.tsx";
import Rules from "./components/Rules.tsx";
import Links from "./components/Links.tsx";

//Top Level of the Website
function App() {
  return (
    <Router>
      <div style={{ width: "100%" }}>
        <div style={{ width: "10%" }}>
          <Logo />
        </div>
        <span style={{ position: "absolute", right: "-25px" }}>
          <StaggeredDropDown />
        </span>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/players" element={<PlayerTable />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/links" element={<Links />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
