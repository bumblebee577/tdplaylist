import React, { Component } from "react";
import "./form.css";

class TaskForm extends Component {
  state = { data: {}, error: {} };

  handleInputChange = (event) => {
    const data = { ...this.state.data };
    data[event.target.id] = event.target.value;

    this.setState({
      data,
    });
  };

  render() {
    return (
      <form className="taskForm">
        <div className="form-group">
          <label for="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={this.state.data.title}
            onChange={this.handleInputChange}
          />
        </div>

        <div className="form-group">
          <label for="status">Status</label>
          <input
            type="text"
            className="form-control"
            id="status"
            value={this.state.data.status}
            onChange={this.handleInputChange}
          />
        </div>

        <div className="form-group">
          <label for="status">Due Date</label>
          <input type="date" className="form-control" id="status" />
        </div>

        <div className="form-group">
          <label for="status">Scheduled</label>
          <input type="date" className="form-control" id="status" />
        </div>

        <div className="form-group">
          <label for="status">Hours Worked</label>
          <input type="number" className="form-control" id="status" />
        </div>

        <div className="form-group">
          <label for="status">Hours Needed</label>
          <input type="number" className="form-control" id="status" />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

export default TaskForm;
