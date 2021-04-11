import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

// add mins counted to task selected
// mins counted is a prop
// task selected is from this component
// start break timer if checked
// whether to start break is from this component

function TimerModal(props) {
  const MINS_TO_ADD = props.timerTime / 60;
  const [taskId, setTaskId] = useState("");
  const [startBreak, setStartBreak] = useState(props.isBreak);

  const handleSelectTask = (e) => {
    setTaskId(e.target.value);
  };

  const handleClickSubmit = () => {
    if (taskId === "") {
      console.log("Invalid task selection. No time added");
      props.handleSetTimerBreak(startBreak);
      props.handleHidTimerModal();
      return;
    }
    let task = props.taskList.filter((t) => t._id === taskId);
    task = task[0];

    const now = new Date();
    const mon =
      now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
    const date = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
    const dateNow = now.getFullYear() + "-" + mon + "-" + date;

    let minsWorked = { [dateNow]: MINS_TO_ADD };

    if (task["minsWorked"]) {
      if (task["minsWorked"][dateNow]) {
        minsWorked = { ...task.minsWorked };
        minsWorked[dateNow] += MINS_TO_ADD;
      } else {
        minsWorked = { ...minsWorked, ...task.minsWorked };
      }
    }
    const updateTask = {
      id: taskId,
      minsWorked,
    };
    props.handleAddTimeToTask(updateTask);
    props.handleSetTimerBreak(startBreak);
    props.handleHidTimerModal();
  };

  const handleBreakCheck = () => {
    setStartBreak(!startBreak);
  };

  return (
    <Modal show={props.showTimerModal}>
      <Modal.Header>
        <h5>Add {MINS_TO_ADD} mins to task:</h5>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <div className="form-check timer-checkbox">
            <input
              className="form-check-input"
              type="checkbox"
              value={startBreak}
              onChange={handleBreakCheck}
            />
            <label className="form-check-label" htmlFor="gridCheck">
              {props.isBreak ? "Stop Break" : "Start Break"}
            </label>
          </div>

          <select className="form-control" onChange={handleSelectTask}>
            <option key="1" value="">
              Select task
            </option>
            {props.taskList.map((t) => (
              <option key={t._id} value={t._id}>
                {t.title}
              </option>
            ))}
          </select>
        </div>
      </Modal.Body>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={props.handleHidTimerModal}
        >
          Close
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleClickSubmit}
        >
          Submit
        </button>
      </div>
    </Modal>
  );
}

export default TimerModal;
