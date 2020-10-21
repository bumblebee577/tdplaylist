import React from "react";
import { Link } from "react-router-dom";
import Table from "../templates/table";
import ButtonGroupFilter from "./buttonGroupFilter";
import _ from "lodash";

class TaskTable extends Table {
  state = {
    taskTitle: "",
    columns: [
      { id: "num", label: "#" },
      { id: "title", label: "Title" },
      { id: "hrsWorked", label: "Hours" },
      { id: "scheduled", label: "Scheduled" },
      { id: "dueDate", label: "Due Date" },
    ],
    sortBy: { id: "title", order: "asc" },
    taskFilter: "all",
  };

  sendAddItem = () => {
    this.props.handleAddTask({ title: this.state.taskTitle });
    this.setState({
      taskTitle: "",
    });
  };

  handleFilterTask = (f) => {
    this.setState({
      taskFilter: f,
    });
  };

  filterTaskList = () => {
    return this.props.taskList.filter(
      (t) => t.status === this.state.taskFilter
    );
  };

  sortColumns = (sortId) => {
    let order = "asc";
    if (this.state.sortBy.id === sortId) {
      order = this.state.sortBy.order === "asc" ? "desc" : "asc";
    }
    const sortBy = { id: sortId, order };
    this.setState({
      sortBy,
    });

    console.log(this.state.sortBy);
  };

  render() {
    const filteredTaskList =
      this.state.taskFilter === "all"
        ? this.props.taskList
        : this.filterTaskList();

    const sortedTaskList = _.orderBy(
      filteredTaskList,
      [this.state.sortBy.id],
      [this.state.sortBy.order]
    );

    return (
      <div className="itemTable">
        <div className="input-group newTaskGroup">
          <input
            type="text"
            className="form-control border border-dark"
            id="title"
            value={this.state.taskTitle}
            onChange={(event) =>
              this.setState({ taskTitle: event.target.value })
            }
            placeholder="New task title"
          />
          <div className="input-group-append mb-3">
            <button
              className="btn btn-outline-primary"
              onClick={() => this.sendAddItem()}
            >
              Add Task
            </button>
          </div>
          <Link to="/taskForm" className="newTask ">
            <button className="btn btn-primary">New Task</button>
          </Link>
        </div>

        <ButtonGroupFilter
          taskFilter={this.state.taskFilter}
          handleFilterTask={this.handleFilterTask}
        />

        <table className="table">
          {this.renderHeader()}

          <tbody>
            {sortedTaskList.map((t, i) => (
              <tr
                key={"row" + i + 1}
                className={t.status === "completed" ? "complete" : "incomplete"}
              >
                <td className="num" key={i + 1}>
                  {i + 1}
                </td>
                <td className="title" key={i + 1 + "title"}>
                  <Link to={`/taskForm/${t._id}`}> {t.title} </Link>
                </td>
                <td className="hours" key={i + 1 + "hrsWorked"}>
                  <div className="badge badge-secondary m2">{t.hrsWorked} </div>
                </td>
                <td className="scheduled" key={i + 1 + "scheduled"}>
                  {this.formatDate(t.scheduled)}
                </td>
                <td className="due" key={i + 1 + "dueDate"}>
                  {this.formatDate(t.dueDate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TaskTable;
