import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./taskTable.css";
import AddToTime from './addToTime';

const TaskTable = (props) => {
  const [taskTitle, setTaskTitle] = useState("");

  const sendAddTask = () => {
    props.handleAddTask({ title: taskTitle });
    window.location.reload();
    setTaskTitle("");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "None";
    let year = dateString.substring(0, 4);
    year = parseInt(year);
    let currentYear = new Date().getFullYear();
    if (year < currentYear) return "None";

    return dateString.substring(0, 10);
  };

  return (
    <div className="taskTable">
      <div className="input-group mb-3 newTaskGroup">
        <input
          type="text"
          className="form-control border border-dark"
          id="title"
          value={taskTitle}
          onChange={(event) => setTaskTitle(event.target.value)}
          placeholder="New task title"
        />
        <div className="input-group-append mb-3">
          <button
            className="btn btn-outline-primary"
            onClick={() => sendAddTask()}
          >
            Add Task
          </button>
        </div>
        <Link to="/taskForm" className="newTask ">
          <button className="btn btn-primary">New Task</button>
        </Link>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col" className="num">
              #
            </th>
            <th scope="col" className="title">
              Title
            </th>
            <th scope="col" className="hours">
              Hours
            </th>
            <th scope="col " className="due">
              Due
            </th>
            <th scope="col" className="status">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {props.taskList.map((t, i) => (
            <tr key={"row" + i + 1}>
              <td className="num" key={i + 1}>
                {i + 1}
              </td>
              <td className="title" key={i + 1 + "title"}>
                <Link to={`/taskForm/${t._id}`}> {t.title} </Link>
              </td>
              <td className="hours" key={i + 1 + "hrsWorked"}>
                {t.hrsWorked} <AddToTime/>
              </td>
              <td className="due" key={i + 1 + "dueDate"}>
                {formatDate(t.dueDate)}
              </td>
              <td className="status" key={i + 1 + "status"}>
                {t.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
