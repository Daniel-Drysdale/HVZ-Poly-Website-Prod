import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Logo from "./components/Logo.tsx";
import Tabs from "./components/Tabs.tsx";
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
        <Tabs />
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
