import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Logo from "./components/Logo.tsx";
import Tabs from "./components/Tabs.tsx";
import Home from "./components/Home.tsx";
import Players from "./components/Players.tsx";
import Rules from "./components/Rules.tsx";
import Links from "./components/Links.tsx";
import InteractableMap from "./components/InteractableMap.tsx";

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
          <Route path="/players" element={<Players />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/links" element={<Links />} />
          <Route path="/map" element={<InteractableMap />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
