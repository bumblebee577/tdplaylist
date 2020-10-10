import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

const nonUserView =() =>{

  return(

  <React.Fragment>
  <li className="nav-item">
          <Link to="/register">
            <i className="fa fa-id-badge" aria-hidden="true"></i>
            Register
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/login">
            <i className="fa fa-sign-in" aria-hidden="true"></i>
            Login
          </Link>
        </li>
  </React.Fragment>
  )

}


const userView = () =>{
  return(
    <React.Fragment>
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

        <li className="nav-item">
          <Link to="/logout">
            {" "}
            <i className="fa fa-sign-out" aria-hidden="true"></i>
            Logout
          </Link>
        </li>
    </React.Fragment>


  )
}

const Sidebar = (props) => {
  return (
    <nav id="navbar">
      <div className="nav-header">
        <h3>TD Playlist</h3>
      </div>
      <div className="nameOfUser">{props.user._id? <p>{props.user.name}</p> : <p>Anonymous</p>}</div>

      <ul className="nav-menu">
      
        {props.user._id? userView() : nonUserView()}
        
      </ul>
    </nav>
  );
};

export default Sidebar;
