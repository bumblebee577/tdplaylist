import React from "react";
import Form from "../templates/form";
import Joi from "joi-browser";
import { register } from "../services/userService";

class Register extends Form {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
    },
  };

  schema = {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  };

  handleSubmitForm = async () => {
    try {
      const response = await register(this.state.data);
      localStorage.setItem("tdplay_token", response.headers["td_auth_token"]);

    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }

    console.log("successful submit");
  };

  render() {
    return (
      <form className="taskForm" onClick={this.handleClickSubmit}>
        {this.renderInput("name", "Name")}
        {this.renderInput("email", "Email")}
        {this.renderInput("password", "Password", "password")}
        {this.renderBtn("submit", "Submit", "btn btn-primary", "submit")}
      </form>
    );
  }
}

export default Register;
