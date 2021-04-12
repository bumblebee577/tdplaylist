import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

// props need to contain:
// showFormModal={this.state.showFormModal}
// taskObj={this.state.taskObj}
// handleAddTask={this.handleAddTask}
// taskField={this.state.taskField} : minswrked, scheduled, status

const FormModal = (props) => {
  //   const [taskObj, setTaskObj] = useState(props.taskObj);

  const handleClickSubmit = () => {
    console.log(`updating ${props.taskField} for ${props.taskObj.id}`);
  };

  return (
    <Modal show={props.showFormModal}>
      <Modal.Header>{props.taskObj.title}</Modal.Header>
      <Modal.Body>Content of Form</Modal.Body>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={props.handleHidFormModal}
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
