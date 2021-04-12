import React from "react";
import { NavLink } from "react-router-dom";

const nonUserView = () => {
  return (
    <React.Fragment>
      <NavLink to="/register">
        <li className="nav-item">
          <i className="fa fa-id-badge" aria-hidden="true"></i>
          Register
        </li>
      </NavLink>

      <NavLink to="/login">
        <li className="nav-item">
          <i className="fa fa-sign-in" aria-hidden="true"></i>
          Login
        </li>
      </NavLink>
    </React.Fragment>
  );
};

const userView = () => {
  return (
    <React.Fragment>
      <NavLink to="/tasks">
        <li className="nav-item">
          {" "}
          <i className="fa fa-tasks" aria-hidden="true"></i>
          Tasks
        </li>
      </NavLink>

      <NavLink to="/goals">
        <li className="nav-item">
          <i className="fa fa-trophy" aria-hidden="true"></i>
          Goals
        </li>
      </NavLink>

      <NavLink to="/report">
        <li className="nav-item">
          <i className="fa fa-pie-chart" aria-hidden="true"></i>
          Report
        </li>
      </NavLink>

      {/* <NavLink to="/settings">
        <li className="nav-item">
          {" "}
          <i className="fa fa-cog" aria-hidden="true"></i>
          Settings
        </li>
      </NavLink> */}

      <NavLink to="/logout">
        <li className="nav-item">
          {" "}
          <i className="fa fa-sign-out" aria-hidden="true"></i>
          Logout
        </li>
      </NavLink>
    </React.Fragment>
  );
};

const Sidebar = (props) => {
  return (
    <nav id="navbar">
      <div className="nav-header">
        <h3>TDPlaylist</h3>
      </div>
      <div className="nameOfUser">
        {props.user.name ? <p>{props.user.name}</p> : <p>Anonymous</p>}
      </div>

      <ul className="nav-menu">
        {props.user._id ? userView() : nonUserView()}
      </ul>
    </nav>
  );
};

export default Sidebar;
