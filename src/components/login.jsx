import React from "react";
import Joi from "joi-browser";
import Form from "../templates/form";
import auth from "../services/authService";

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
      await auth.login(data.email, data.password);
      window.location = "/tasks";
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
      <form className="formContent" onSubmit={this.handleClickSubmit}>
        {this.renderInput("email", "Email")}{" "}
        {this.renderInput("password", "Password", { type: "password" })}
        <button className="btn btn-primary" type={"submit"}>
          Submit
        </button>
      </form>
    );
  }
}

export default Login;
