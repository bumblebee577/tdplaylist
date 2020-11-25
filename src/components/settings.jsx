import React from "react";
import Form from "../templates/form";
import { NavLink } from "react-router-dom";

class Settings extends Form {
  state = {
    data: {
      name: "",
      email: "",
      workTimer: 25,
      shortBreakTimer: 5,
      longBreakTimer: 15,
      addTime: 25,
      newPassword: "",
      confirmNewPassword: "",
    },
    errors: {},
  };
  render() {
    return (
      <div className="formPage component">
        <form className="formContent">
          {this.renderInput("name", "Name")}
          {this.renderInput("email", "Email")}
          {this.renderInput("workTimer", "Work Timer")}
          {this.renderInput("shortBreakTimer", "Short Break Timer")}
          {this.renderInput("longBreakTimer", "Long Break Timer")}
          {this.renderInput("addTime", "Add Time")}
          {this.renderBtn("submit", "Submit", "btn btn-primary")}
        </form>
        <div className="formContent">
          <NavLink to="/changePw">
            <button className="btn btn-warning">Change Password</button>
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Settings;
