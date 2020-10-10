import React from "react";
import Joi from "joi-browser";
import Form from "../templates/form";
import { auth } from "../services/authService";

class Login extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };
  schema = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  };

  handleSubmitForm = async () => {
    try {
      const { data } = this.state;
      const {data: jwt} = await auth(data.email, data.password);
      localStorage.setItem("td_token", jwt )
      window.location = "/tasks"

    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({
          errors,
        });
      }
    }
  };

  render() {
    return (
      <form className="taskForm" onSubmit={this.handleClickSubmit}>
        {this.renderInput("email", "Email")}{" "}
        {this.renderInput("password", "Password", "password")}
        <button className="btn btn-primary" type={"submit"}>
          Submit
        </button>
      </form>
    );
  }
}

export default Login;
