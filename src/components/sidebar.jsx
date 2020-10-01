import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <nav id="navbar">
      <div className="nav-header">
        <h3>TD Playlist</h3>
      </div>
      <ul className="nav-menu">
        <li className="nav-item">
          <Link to="/tasks">
            {" "}
            <i className="fa fa-tasks" aria-hidden="true"></i>
            Tasks
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/goals">
            <i className="fa fa-trophy" aria-hidden="true"></i>
            Goals
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/report">
            <i className="fa fa-pie-chart" aria-hidden="true"></i>
            Report
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/settings">
            {" "}
            <i className="fa fa-cog" aria-hidden="true"></i>
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
