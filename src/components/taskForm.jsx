import React from "react";
import Joi from "joi-browser";
import Form from "../templates/form";

class TaskForm extends Form {
  state = {
    data: {
      title: "",
      status: "new",
      hrsWorked: 0,
      hrsNeeded: 0,
      scheduled: "",
      dueDate: "",
    },
    errors: {},
  };

  schema = {
    title: Joi.string().required(),
    status: Joi.string().required(),
    hrsWorked: Joi.number(),
    hrsNeeded: Joi.number(),
    scheduled: Joi.date(),
    dueDate: Joi.date(),
  };

  handleSubmitForm = () => {
    this.props.handleAddTask(this.state.data);
    console.log("successful submit");
  };

  render() {
    return (
      <form className="taskForm" onSubmit={this.handleClickSubmit}>
        {this.renderInput("title", "Title")}
        {this.renderSelection("status", "Status", [
          "new",
          "inProgress",
          "onHold",
          "completed",
        ])}
        {this.renderInput("dueDate", "Due Date", "date")}

        <div className="form-group">
          <label htmlFor="scheduled">Scheduled</label>
          <input
            type="date"
            className="form-control"
            id="scheduled"
            value={this.state.data.scheduled}
            onChange={this.handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="hrsWorked">Hours Worked</label>
          <input
            type="number"
            className="form-control"
            id="hrsWorked"
            value={this.state.data.hrsWorked}
            onChange={this.handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="hrsNeeded">Hours Needed</label>
          <input
            type="number"
            className="form-control"
            id="hrsNeeded"
            value={this.state.data.hrsNeeded}
            onChange={this.handleInputChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <p>{this.props.match.params.id}</p>
      </form>
    );
  }
}

export default TaskForm;
