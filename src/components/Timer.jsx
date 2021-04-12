import React, { Component } from "react";

class Timer extends Component {
  state = {
    isRunning: false,
    timerInterval: undefined,
  };

  formatTime = () => {
    let mins = Math.floor(this.props.timerTime / 60);
    let secs = Math.floor(this.props.timerTime % 60);

    mins = mins < 10 ? "0" + mins : mins + "";
    secs = secs < 10 ? "0" + secs : secs + "";

    return `${mins} : ${secs}`;
  };

  startTimer = () => {
    if (this.props.timerTime > 0) {
      this.props.handleCountTime(this.props.timerTime - 1);
    } else {
      clearInterval(this.state.timerInterval);
      this.setState({
        isRunning: false,
        timerInterval: undefined,
      });
    }
  };

  renderStartBtn = () => {
    return this.state.isRunning ? (
      <i className="fa fa-pause" aria-hidden="true"></i>
    ) : (
      <i className="fa fa-play" aria-hidden="true"></i>
    );
  };

  handleStartBtn = () => {
    if (this.state.isRunning) {
      clearInterval(this.state.timerInterval);
      this.setState({
        isRunning: false,
        timerInterval: undefined,
      });
    } else {
      this.setState({
        isRunning: true,
        timerInterval: setInterval(this.startTimer, 1000),
      });
    }
  };

  handleResetBtn = () => {
    this.props.handleCountTime(25 * 60);
    this.props.handleSetTime(25 * 60);
  };

  handleIncrement = () => {
    if (this.props.timerTime < 60 * 60) {
      this.props.handleCountTime(this.props.timerTime + 60);
      this.props.handleSetTime(this.props.setTime + 60);
    }
  };

  handleDecrement = () => {
    if (this.props.timerTime > 60) {
      this.props.handleCountTime(this.props.timerTime - 60);
      this.props.handleSetTime(this.props.setTime - 60);
    }
  };

  handleLogTimeBtn = () => {
    this.props.handleShowTimerModal();
  };

  render() {
    return (
      <div className="timerC">
        <h1>{this.formatTime()} </h1>

        <span className="timerLabel">
          <button
            type="button"
            className="btn btn-light"
            onClick={this.handleLogTimeBtn}
          >
            Log time
          </button>
          <span className="timerLabelToolTip">
            Click to assign time to a Task
          </span>
        </span>
        <span>
          <button className="btn btn-secondary" onClick={this.handleStartBtn}>
            {this.renderStartBtn()}
          </button>

          <button className="btn btn-secondary" onClick={this.handleResetBtn}>
            <i className="fa fa-refresh" aria-hidden="true"></i>
          </button>
          <button className="btn btn-secondary" onClick={this.handleDecrement}>
            <i className="fa fa-arrow-down" aria-hidden="true"></i>
          </button>
          <button className="btn btn-secondary" onClick={this.handleIncrement}>
            <i className="fa fa-arrow-up" aria-hidden="true"></i>
          </button>
        </span>
      </div>
    );
  }
}

export default Timer;
