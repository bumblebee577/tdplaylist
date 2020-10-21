import React, { Component } from "react";
import Form from "../templates/form";

class Settings extends Form {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
    },
    errors: {},
  };
  render() {
    return (
      <div className="formPage">
        <h1>Settings</h1>

        <form className="formContent">{this.renderInput("name", "Name")}</form>
      </div>
    );
  }
}

export default Settings;
