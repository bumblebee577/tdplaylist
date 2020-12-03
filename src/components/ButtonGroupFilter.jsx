import React, { Component } from "react";

class ButtonGroupFilter extends Component {
  render() {
    const taskStatusList = ["all", "new", "inprogress", "onhold", "completed"];

    return (
      <div className="btn-group" role="group">
        {taskStatusList.map((s) => (
          <button
            type="button"
            key={s}
            className={
              this.props.taskFilter === s
                ? "btn btn-light active"
                : "btn btn-light"
            }
            onClick={() => this.props.handleFilterTask(s)}
          >
            {s === "completed" ? <s>{s}</s> : s}
          </button>
        ))}
      </div>
    );
  }
}

export default ButtonGroupFilter;
