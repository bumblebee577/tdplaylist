import React, { Component } from "react";

class Timer extends Component {
  state = {
    timeInSecs: 25 * 60,
    isRunning: false,
    isBreak: false,
    timerInterval: undefined,
  };

  formatTime = () => {
    let mins = Math.floor(this.state.timeInSecs / 60);
    let secs = Math.floor(this.state.timeInSecs % 60);

    mins = mins < 10 ? "0" + mins : mins + "";
    secs = secs < 10 ? "0" + secs : secs + "";

    return `${mins} : ${secs}`;
  };

  startTimer = () => {
    if (this.state.timeInSecs > 0) {
      this.setState((state) => ({
        timeInSecs: state.timeInSecs - 1,
      }));
    } else {
      clearInterval(this.state.timerInterval);
      this.setState({
        timeInSec: 0,
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
    let timeInMin = 25;
    this.setState({
      timeInSecs: timeInMin * 60,
    });
  };

  handleIncrement = () => {
    if (this.state.timeInSecs < 60 * 60) {
      let timeInMin = this.state.timeInSecs / 60 + 1;
      this.setState((state) => ({
        timeInSecs: timeInMin * 60,
      }));
    }
  };

  handleDecrement = () => {
    if (this.state.timeInSecs > 60) {
      let timeInMin = this.state.timeInSecs / 60 - 1;

      this.setState((state) => ({
        timeInSecs: timeInMin * 60,
      }));
    }
  };
  render() {
    return (
      <div className="timerC">
        <h1>{this.formatTime()} </h1>

        <span className="timerLabel">
          <button className="btn btn-light">
            {this.state.isBreak ? "Break" : "Work"}
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
