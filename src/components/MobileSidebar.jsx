import React, { useRef } from "react";
import { NavLink } from "react-router-dom";

const nonUserView = () => {
  return (
    <React.Fragment>
      <NavLink to="/register">
        <li className="nav-item">Register</li>
      </NavLink>

      <NavLink to="/login">
        <li className="nav-item">Login</li>
      </NavLink>
    </React.Fragment>
  );
};

const userView = () => {
  return (
    <React.Fragment>
      <NavLink to="/tasks">
        <li className="nav-item">Tasks</li>
      </NavLink>

      <NavLink to="/goals">
        <li className="nav-item">Goals</li>
      </NavLink>

      <NavLink to="/report">
        <li className="nav-item">Report</li>
      </NavLink>

      <NavLink to="/logout">
        <li className="nav-item">Logout</li>
      </NavLink>
    </React.Fragment>
  );
};

const MobileSidebar = (props) => {
  const navRef = useRef(null);

  const handleShowNav = () => {
    if (navRef.current["classList"].contains("collapse")) {
      navRef.current["classList"].remove("collapse");
    } else {
      navRef.current["classList"].add("collapse");
    }
  };

  return (
    <nav id="mobile-sidebar">
      <button
        className="navbar-toggler"
        id="nav-btn"
        type="button"
        data-toggle="collapse"
        data-target="#navbarToggleExternalContent"
        aria-controls="navbarToggleExternalContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        onClick={() => handleShowNav()}
      >
        <i className="fa fa-bars"></i>
      </button>
      <div className="collapse" id="nav-toggle" ref={navRef}>
        <div className="bg-dark p-4" id="nav-content">
          <h3>Tdplaylist</h3>
          <ul className="nav-menu">
            {props.user._id ? userView() : nonUserView()}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MobileSidebar;
