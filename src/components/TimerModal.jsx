import React from "react";
import Modal from "react-bootstrap/Modal";

function TimerModal(props) {
  return (
    <Modal show={props.showTimerModal}>
      <Modal.Header>
        <h5>Add 25 mins to task:</h5>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <select className="form-control">
            <option>Task1</option>
            <option>Task2</option>
          </select>
        </div>
      </Modal.Body>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          onClick={props.handleHidTimerModal}
        >
          Close
        </button>
        <button type="button" class="btn btn-primary">
          Submit
        </button>
      </div>
    </Modal>
  );
}

export default TimerModal;
