import React, { useState } from "react";
import { useEffect } from "react";
import Home from "./Home.tsx";
import Players from "./Players.tsx";
import Rules from "./Rules.tsx";

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (id: number) => {
    setActiveTab(id);
  };

  const initialTime = 7 * 60; //Every 7 minutes, reset
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    // Create a timer that updates every second

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (activeTab != 0) {
          setTimeLeft(initialTime);
        }
        if (prev <= 1 || timeLeft == 0) {
          clearInterval(timer);

          window.location.reload(); // Reload the page when the timer hits 0

          return 0;
        }
        return prev - 1; // Decrease the time left by 1 second
      });
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timer);
  }, [activeTab]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <div>
            <Home />
          </div>
        );
      case 1:
        return (
          <div>
            <Players />
          </div>
        );
      case 2:
        return (
          <div>
            <Rules />
          </div>
        );

      case 3:
        return <div>Useful Links can be found here.</div>;
      default:
        return <div>Welcome!</div>;
    }
  };

  if (activeTab == 0) {
  }

  return (
    <>
      <ul
        className="nav nav-pills"
        style={{
          position: "absolute",
          minWidth: "650px",
          top: "-15px",

          marginLeft: "10vw",
          marginRight: "10vw",
        }}
      >
        <ul
          className="nav nav-pills m-5 row"
          style={{ float: "left", marginInline: "5%" }}
        >
          <li className="nav-item col">
            <button
              className={`nav-link ${activeTab === 0 ? "active" : ""}`}
              onClick={() => handleTabClick(0)}
            >
              Home
            </button>
          </li>
          <li className="nav-item col">
            <button
              className={`nav-link ${activeTab === 1 ? "active" : ""}`}
              onClick={() => handleTabClick(1)}
            >
              Players
            </button>
          </li>
          <li className="nav-item col">
            <button
              className={`nav-link ${activeTab === 2 ? "active" : ""}`}
              onClick={() => handleTabClick(2)}
            >
              Rules
            </button>
          </li>
          <li className="nav-item col">
            <button
              className={`nav-link ${activeTab === 3 ? "active" : ""}`}
              onClick={() => handleTabClick(3)}
            >
              Links
            </button>
          </li>
        </ul>
      </ul>
      <div style={{ marginTop: "100px" }}>{renderTabContent()}</div>
    </>
  );
};

export default Tabs;
