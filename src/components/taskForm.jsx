import React from "react";
import Joi from "joi-browser";
import Form from "../templates/form";
import { getOneTask, deleteTask } from "../services/taskService";

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

  async componentDidMount() {
    if (this.props.match.params.id) {
      const { data } = await getOneTask(this.props.match.params.id);
      const dueYear = data.dueDate ? data.dueDate.substring(0, 4) : 0;
      const schedYear = data.scheduled ? data.scheduled.substring(0, 4) : 0;
      this.setState({
        data: {
          title: data.title,
          status: data.status,
          dueDate: dueYear > 2000 ? data.dueDate.substring(0, 10) : "",
          scheduled: schedYear > 2000 ? data.scheduled.substring(0, 10) : "",
          hrsWorked: data.hrsWorked ? data.hrsWorked : 0,
          hrsNeeded: data.hrsNeeded ? data.hrsNeeded : 0,
        },
      });
    }
  }

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
    this.props.history.push("/tasks");
    console.log("successful submit");
  };

  handleDelete = async () => {
    await deleteTask(this.props.match.params.id);
    this.props.history.push("/tasks");
    window.location.reload();
  };

  render() {
    return (
      <div>
        <div>
          {this.props.match.params.id ? (
            <button
              id="delete"
              className="btn btn-danger mt-2 mb-2"
              onClick={this.handleDelete}
            >
              Delete
            </button>
          ) : (
            ""
          )}
        </div>

        <form className="taskForm" onSubmit={this.handleClickSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelection("status", "Status", [
            "new",
            "inprogress",
            "onhold",
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

          <button id="submit" type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default TaskForm;
