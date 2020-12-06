import React from "react";
import Joi from "joi-browser";
import Form from "../templates/Form";
import { getOneTask, deleteTask } from "../services/taskService";

class TaskForm extends Form {
  state = {
    taskObj: {},
    data: {
      _id: "",
      ownerId: "",
      title: "",
      status: "new",
      goal: "None",
      dateWorked: "",
      minsWorked: 0,
      hrsNeeded: 0,
      scheduled: "",
      dueDate: "",
    },
    errors: {},
  };

  async componentDidMount() {
    if (this.props.match.params.id) {
      let { data } = await getOneTask(
        this.props.match.params.ownerId,
        this.props.match.params.id
      );

      data = data[0];

      let month =
        new Date().getMonth() + 1 < 10
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1;
      let date =
        new Date().getDate() < 10
          ? "0" + new Date().getDate()
          : new Date().getDate();
      const todaysDate = new Date().getFullYear() + "-" + month + "-" + date;

      // const todayGmt = new Date().toGMTString().slice(0, 16);
      const dueYear = data.dueDate ? data.dueDate.substring(0, 4) : 0;
      const schedYear = data.scheduled ? data.scheduled.substring(0, 4) : 0;
      const minsToday = data.minsWorked ? data.minsWorked[todaysDate] : null;

      this.setState({
        taskObj: data,
        data: {
          _id: data._id,
          ownerId: data.ownerId,
          title: data.title,
          status: data.status,
          goal: data.goal,
          dateWorked: todaysDate,
          minsWorked: minsToday ? minsToday : 0,
          hrsNeeded: data.hrsNeeded ? data.hrsNeeded : 0,
          scheduled: schedYear > 2000 ? data.scheduled.substring(0, 10) : "",
          dueDate: dueYear > 2000 ? data.dueDate.substring(0, 10) : "",
        },
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data.dateWorked !== this.state.data.dateWorked) {
      const { minsWorked } = this.state.taskObj;

      const minsInput =
        this.state.data.dateWorked &&
        minsWorked &&
        minsWorked[this.state.data.dateWorked]
          ? minsWorked[this.state.data.dateWorked]
          : 0;

      if (this.state.data.minsWorked !== minsInput) {
        const { data } = this.state;
        data.minsWorked = minsInput;
        this.setState({
          data,
        });
      }
    }
  }

  schema = {
    _id: Joi.string().allow(""),
    ownerId: Joi.string().allow(""),
    title: Joi.string().required(),
    status: Joi.string().required(),
    goal: Joi.string().allow(""),
    dateWorked: Joi.date().allow(""),
    minsWorked: Joi.number().min(0),
    hrsNeeded: Joi.number().min(0),
    scheduled: Joi.date().allow(""),
    dueDate: Joi.date().allow(""),
  };

  handleSubmitForm = () => {
    const {
      _id,
      ownerId,
      title,
      status,
      goal,
      dateWorked,
      minsWorked,
      hrsNeeded,
      scheduled,
      dueDate,
    } = this.state.data;

    let preTimeObj = {
      ...this.state.taskObj.minsWorked,
      [dateWorked]: parseInt(minsWorked),
    };

    const postTimeObj = Object.keys(preTimeObj).reduce((f, k) => {
      if (preTimeObj[k] > 0) f[k] = preTimeObj[k];
      return f;
    }, {});

    const newtaskObj = {
      _id,
      ownerId,
      title,
      status,
      goal,
      minsWorked: postTimeObj,
      hrsNeeded: hrsNeeded,
      scheduled,
      dueDate,
    };

    this.props.handleAddTask(newtaskObj);
    this.props.history.push("/tasks");
    console.log("successful submit");
  };

  handleDelete = async () => {
    await deleteTask(this.props.match.params.id);
    this.props.history.push("/tasks");
    window.location.reload();
  };

  render() {
    const goalSelection = this.props.goalList.reduce(
      (a, c) => {
        a.push(c.name);
        return a;
      },
      ["None"]
    );

    const datesWorked = this.state.taskObj.minsWorked
      ? Object.keys(this.state.taskObj.minsWorked)
      : null;

    return (
      <div className="formPage">
        {datesWorked && (
          <div className="formContent">
            <div>
              <details open>
                <summary>List of time worked on this task</summary>
                {datesWorked.map((d) => (
                  <li key={d}>
                    {d + " : " + this.state.taskObj.minsWorked[d] + " minutes"}
                  </li>
                ))}
              </details>
            </div>
          </div>
        )}
        <form className="formContent" onSubmit={this.handleClickSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelection("status", "Status", [
            "new",
            "inprogress",
            "onhold",
            "completed",
          ])}
          <h5>Edit Time Worked</h5>
          <p>
            Choose the date you want to edit and update the minutes worked for
            that date
          </p>

          <div className="two-col-input">
            {this.renderInput("dateWorked", "Date", { type: "date" })}
            {this.renderInput("minsWorked", "Minutes", {
              type: "number",
              min: 0,
            })}
          </div>

          {this.renderInput("hrsNeeded", "Hours Needed", {
            type: "number",
            min: 0,
          })}
          {this.renderSelection("goal", "Goal", goalSelection)}
          {this.renderInput("dueDate", "Due Date", { type: "date" })}
          {this.renderInput("scheduled", "Scheduled", { type: "date" })}

          <button id="submit" type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <div className="formContent">
          {this.props.match.params.id ? (
            <button
              id="delete"
              className="btn btn-danger"
              onClick={this.handleDelete}
            >
              Delete
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default TaskForm;
