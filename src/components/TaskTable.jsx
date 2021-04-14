import React from "react";
import { Link } from "react-router-dom";
import { currentDateToLocalTime } from "./../utils/formatDate";
import Table from "../templates/Table";
import ButtonGroupFilter from "./ButtonGroupFilter";
import _ from "lodash";
import { addDoneToTask } from "../services/taskService";

class TaskTable extends Table {
  state = {
    taskTitle: "",
    columns: [
      { id: "num", label: "#" },
      { id: "title", label: "Title" },
      { id: "goal", label: "Goal" },
      { id: "minsWorked", label: "Mins Wrked" },
      { id: "scheduled", label: "Scheduled" },
      { id: "status", label: "Status" },
    ],
    sortBy: { id: "title", order: "asc" },
    taskFilter: "agenda",
    checked: {},
  };

  componentDidMount() {
    if (this.state.taskFilter === "agenda") {
      let checked = this.props.taskList.reduce((a, c) => {
        a[c._id] = c.done === currentDateToLocalTime() ? true : false;
        return a;
      }, {});

      this.setState({
        checked,
      });
    }
  }

  sendAddItem = () => {
    this.props.handleAddTask({ title: this.state.taskTitle });
    this.setState({
      taskTitle: "",
      taskFilter: "all",
    });
  };

  handleFilterTask = (f) => {
    this.setState({
      taskFilter: f,
    });
  };

  filterTaskList = () => {
    if (this.state.taskFilter === "all") {
      return this.props.taskList.filter((t) => t.status !== "completed");
    } else if (this.state.taskFilter === "agenda") {
      return this.props.taskList.filter((t) => {
        return typeof t.scheduled === "string"
          ? currentDateToLocalTime() === t.scheduled.slice(0, 10)
          : false;
      });
    } else {
      return this.props.taskList.filter(
        (t) => t.status === this.state.taskFilter
      );
    }
  };

  filterTaskIncomplete = () => {
    return this.props.taskList.filter((t) => t.status !== "completed");
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
  };

  handleChecked = async (id) => {
    let taskObj = {
      id,
      done: "",
    };
    let oldChecked = { ...this.state.checked };
    let newChecked = { ...this.state.checked };

    if (this.state.checked[id]) {
      delete newChecked[id];
      this.setState({
        checked: newChecked,
      });
    } else {
      taskObj["done"] = currentDateToLocalTime();
      this.setState({
        checked: { ...newChecked, [id]: true },
      });
    }

    try {
      await addDoneToTask(taskObj);
    } catch (ex) {
      this.setState({
        checked: oldChecked,
      });
    }
  };

  render() {
    const filteredTaskList = this.filterTaskList();

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
        {this.state.taskFilter === "agenda" ? (
          <h2>{new Date().toDateString()}</h2>
        ) : null}

        {_.isEmpty(sortedTaskList) ? (
          <i>{`No tasks for filter "${this.state.taskFilter}"`}</i>
        ) : (
          <table className="table">
            {this.state.taskFilter === "agenda"
              ? this.renderHeader("Done")
              : this.renderHeader()}

            <tbody>
              {sortedTaskList.map((t, i) => (
                <tr
                  key={"row" + i + 1}
                  className={
                    t.status === "completed" ? "complete" : "incomplete"
                  }
                >
                  <td className="num" key={i + 1}>
                    {i + 1}
                  </td>
                  <td
                    className={
                      this.state.checked[t._id] &&
                      this.state.taskFilter === "agenda"
                        ? "title complete  "
                        : "title incomplete  "
                    }
                    key={i + 1 + "title"}
                  >
                    <Link to={`/taskForm/${t.ownerId}/${t._id}`}>
                      {" "}
                      {t.title}{" "}
                    </Link>
                  </td>
                  <td
                    className={
                      this.state.checked[t._id] &&
                      this.state.taskFilter === "agenda"
                        ? "goal complete  "
                        : "goal incomplete  "
                    }
                    key={i + 1 + "goal"}
                  >
                    {t.goal}
                  </td>
                  <td
                    className={
                      this.state.checked[t._id] &&
                      this.state.taskFilter === "agenda"
                        ? "modal_row_item  complete  "
                        : "modal_row_item incomplete  "
                    }
                    key={i + 1 + "minsWorked"}
                    onClick={() =>
                      this.props.handleGetTaskForModal(t._id, "minswrked")
                    }
                  >
                    {t.minsWorked
                      ? Object.values(t.minsWorked).reduce(
                          (a, c) => a + parseInt(c),
                          0
                        )
                      : 0}{" "}
                  </td>
                  <td
                    className={
                      this.state.checked[t._id] &&
                      this.state.taskFilter === "agenda"
                        ? "modal_row_item  complete  "
                        : "modal_row_item incomplete  "
                    }
                    key={i + 1 + "scheduled"}
                    onClick={() =>
                      this.props.handleGetTaskForModal(t._id, "scheduled")
                    }
                  >
                    {this.formatDate(t.scheduled)}
                  </td>
                  <td
                    className={
                      this.state.checked[t._id] &&
                      this.state.taskFilter === "agenda"
                        ? "modal_row_item complete"
                        : "modal_row_item incomplete"
                    }
                    key={i + 1 + "status"}
                    onClick={() =>
                      this.props.handleGetTaskForModal(t._id, "status")
                    }
                  >
                    {t.status}
                  </td>
                  {this.state.taskFilter === "agenda" && (
                    <td className="done" key={i + 1 + "done"}>
                      <input
                        type="checkbox"
                        onChange={() => this.handleChecked(t._id)}
                        checked={this.state.checked[t._id] ? true : false}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default TaskTable;
