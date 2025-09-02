import React from "react";
import { NavLink } from "react-router-dom";

const Tabs: React.FC = () => {
  const tabStyle = (minWidth: string) => ({
    marginInline: "10%",
    width: "100%",
    fontSize: ".9rem",
    minWidth,
  });

  return (
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
        <ul className="nav nav-pills font-type">
          <li className="nav-item col">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
              style={tabStyle("30%")}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item col">
            <NavLink
              to="/players"
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
              style={tabStyle("20%")}
            >
              Players
            </NavLink>
          </li>
          <li className="nav-item col">
            <NavLink
              to="/rules"
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
              style={tabStyle("20%")}
            >
              Rules
            </NavLink>
          </li>
          <li className="nav-item col">
            <NavLink
              to="/links"
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
              style={tabStyle("20%")}
            >
              Links
            </NavLink>
          </li>
        </ul>
      </ul>
    </div>
  );
};

export default Tabs;
