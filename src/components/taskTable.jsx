import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./taskTable.css";

const TaskTable = (props) => {
  const [taskTitle, setTaskTitle] = useState("");

  const sendAddTask = () => {
    props.handleAddTask({ title: taskTitle });
    setTaskTitle("");
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
            <tr>
              <td className="num">{i + 1}</td>
              <td className="title">{t.title}</td>
              <td className="hours">{t.hrsWorked}</td>
              <td className="due">{t.dueDate ? t.dueDate : "None"}</td>
              <td className="status">{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
