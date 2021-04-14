import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import RenderSelection from "./../templates/RenderSelection";
import RenderInput from "../templates/RenderInput";
import { currentDateToLocalTime } from "../utils/formatDate";

// props need to contain:
// showFormModal={this.state.showFormModal}
// taskObj={this.state.taskObj}
// handleAddTask={this.handleAddTask}
// taskField={this.state.taskField} : minswrked, scheduled, status

const FormModal = ({
  showFormModal,
  taskObj,
  taskField,
  handleAddTask,
  handleHidFormModal,
}) => {
  //   const [taskObj, setTaskObj] = useState(props.taskObj);
  const [statusSelect, setStatusSelect] = useState("");
  const [schedInput, setSchedInput] = useState("");
  const [minsWrkedInput, setMinsWrkedInput] = useState(0);

  const handleClickSubmit = () => {
    const newTaskObj = { ...taskObj };

    if (taskField === "status" && statusSelect !== "") {
      newTaskObj["status"] = statusSelect;
      handleAddTask(newTaskObj);
    } else if (taskField === "scheduled" && schedInput !== "") {
      newTaskObj["scheduled"] = schedInput;
      handleAddTask(newTaskObj);
    } else if (taskField === "minswrked" && minsWrkedInput !== 0) {
      const minsWrked = { ...newTaskObj.minsWorked };

      minsWrked[currentDateToLocalTime()] = minsWrked[currentDateToLocalTime()]
        ? minsWrked[currentDateToLocalTime()] + parseInt(minsWrkedInput)
        : parseInt(minsWrkedInput);

      newTaskObj["minsWorked"] = minsWrked;

      handleAddTask(newTaskObj);
    }

    handleHidFormModal();
  };

  const getInput = (item) => {
    const itemType = typeof item;

    if (itemType === "string" && taskField === "status") {
      setStatusSelect(item);
    } else if (itemType === "string" && taskField === "scheduled") {
      setSchedInput(item);
    } else if (itemType === "string" && taskField === "minswrked") {
      setMinsWrkedInput(item);
    } else {
      console.log("Input item is invalid for this form");
    }
  };
  const inputType = taskField === "scheduled" ? "Date" : "number";

  return (
    <Modal show={showFormModal}>
      <Modal.Header>{taskObj.title}s</Modal.Header>
      <Modal.Body>
        {taskField === "status" ? (
          <RenderSelection
            id={taskField}
            label={taskField.charAt(0).toUpperCase() + taskField.slice(1)}
            list={["new", "inprogress", "onhold", "completed"]}
            sendInput={getInput}
          />
        ) : (
          <RenderInput
            id={taskField}
            label={taskField.charAt(0).toUpperCase() + taskField.slice(1)}
            type={inputType}
            sendInput={getInput}
          />
        )}
      </Modal.Body>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleHidFormModal}
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
};

export default FormModal;
