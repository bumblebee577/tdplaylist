import React, { Component } from "react";
import Joi from "joi-browser";
import "./form.css";

class Form extends Component {
  state = { data: {}, errors: {} };

  validateEachInput = (name, value) => {
    if (name === "scheduled" || name === "dueDate") return "";
    const subInput = { [name]: value };
    const subSchema = { [name]: this.schema[name] };
    const result = Joi.validate(subInput, subSchema);

    return result.error ? result.error.details[0].message : "";
  };

  handleInputChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.id] = input.value;

    const errors = { ...this.state.errors };

    errors[input.id] = this.validateEachInput(input.id, input.value);
    if (!errors[input.id]) delete errors[input.id];

    this.setState({
      data,
      errors,
    });
  };

  validateSubmitInput = () => {
    const options = {
      abortEarly: false,
    };

    const result = Joi.validate(this.state.data, this.schema, options);
    if (!result.error) return {};

    return result.error.details.reduce((a, c) => {
      if (c.path[0] !== "scheduled" && c.path[0] !== "dueDate") {
        a[c.path] = c.message;
      }

      return a;
    }, {});
  };

  handleClickSubmit = (event) => {
    event.preventDefault();

    const errors = this.validateSubmitInput();

    this.setState({
      errors,
    });

    if (Object.keys(errors).length > 0) return;
    this.handleSubmitForm();
  };

  handleSubmitForm = () => {
    console.log("successful submit");
  };

  renderInput = (id, label, type = "text") => {
    return (
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          name={id}
          value={this.state.data[id]}
          onChange={this.handleInputChange}
          type={type}
          className="form-control"
          autoFocus
        />
        {this.state.errors
          ? this.state.errors[id] && (
              <div className="alert alert-danger">{this.state.errors[id]}</div>
            )
          : ""}
      </div>
    );
  };

  renderSelection = (id, label, obj) => {
    return (
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <select
          className="form-control"
          id={id}
          name={id}
          onChange={this.handleInputChange}
          value={this.state.data[id]}
        >
          {obj.map((item) => (
            <option key={id + item} value={item}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </option>
          ))}
        </select>
      </div>
    );
  };

  renderBtn = (id, label, btnClass, type, handle) => {
    return (
      <button id={id} className={btnClass} type={type} onClick={handle}>
        {label}
      </button>
    );
  };
}

export default Form;
