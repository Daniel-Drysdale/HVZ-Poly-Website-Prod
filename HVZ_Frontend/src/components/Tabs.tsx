import React, { useState } from "react";
import { useEffect } from "react";
import Home from "./Home.tsx";
import Players from "./Players.tsx";
import Rules from "./Rules.tsx";
import Links from "./Links.tsx";

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (id: number) => {
    setActiveTab(id);
  };

  const initialTime = 7 * 60;
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (activeTab != 0) {
          setTimeLeft(initialTime);
        }
        if (prev <= 1 || timeLeft == 0) {
          clearInterval(timer);

          window.location.reload();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
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
        return (
          <div>
            <Links />
          </div>
        );
      default:
        return <div>Welcome!</div>;
    }
  };

  if (activeTab == 0) {
  }

  return (
    <>
      <div style={{ minWidth: "5rem" }}>
        <div className="center-div" style={{ width: "rem" }}></div>
        <ul
          className="nav nav-pills"
          style={{
            position: "absolute",
            minWidth: "100%",
            top: "2rem",
            marginLeft: "80px",
            marginRight: "100%",
          }}
        >
          <ul className="nav nav-pills font-type" style={{}}>
            <li className="nav-item col">
              <button
                className={`nav-link ${activeTab === 0 ? "active" : ""}`}
                onClick={() => handleTabClick(0)}
                style={{
                  marginInline: "10%",
                  width: "100%",
                  fontSize: ".9rem",
                  minWidth: "30%",
                }}
              >
                Home
              </button>
            </li>
            <li className="nav-item col">
              <button
                className={`nav-link ${activeTab === 1 ? "active" : ""}`}
                onClick={() => handleTabClick(1)}
                style={{
                  marginInline: "10%",
                  width: "100%",
                  fontSize: ".9rem",
                  minWidth: "20%",
                }}
              >
                Players
              </button>
            </li>
            <li className="nav-item col">
              <button
                className={`nav-link ${activeTab === 2 ? "active" : ""}`}
                onClick={() => handleTabClick(2)}
                style={{
                  marginInline: "10%",
                  width: "100%",
                  fontSize: ".9rem",
                  minWidth: "20%",
                }}
              >
                Rules
              </button>
            </li>
            <li className="nav-item col">
              <button
                className={`nav-link ${activeTab === 3 ? "active" : ""}`}
                onClick={() => handleTabClick(3)}
                style={{
                  marginInline: "10%",
                  width: "100%",
                  fontSize: ".9rem",
                  minWidth: "20%",
                }}
              >
                Links
              </button>
            </li>
          </ul>
        </ul>
        <div style={{ marginTop: "100px" }}>{renderTabContent()}</div>
      </div>
    </>
  );
};

export default Tabs;
