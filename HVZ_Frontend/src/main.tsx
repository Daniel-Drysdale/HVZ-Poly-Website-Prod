import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Header from "./assets/Header.png";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <img
      className=""
      src={Header}
      style={{
        width: "100%",
        height: "200px",
        top: "-100px",
        position: "absolute",
      }}
      alt="Header"
    />
    <App />
  </StrictMode>
);
