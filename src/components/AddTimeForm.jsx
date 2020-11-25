import React, { Component } from "react";
import { getOneTask } from "../services/taskService";

class AddTimeForm extends Component {
  state = {
    date: "",
    mins: "",
    data: {},
    error: {},
  };

  componentDidMount() {
    this.setState({
      data: this.props.minsWorked,
    });
  }

  handleOnChange = ({ currentTarget: input }) => {
    const value = input.id === "mins" ? parseInt(input.value) : input.value;

    this.setState({
      [input.id]: value,
    });
  };

  handleClickSubmit = (event) => {
    event.preventDefault();
    const data = { ...this.state.data };
    const todaydate = new Date(this.state.date).toGMTString().slice(0, 16);
    console.log(todaydate);
    data[todaydate] = this.state.mins;
    console.log(data);
    //   this.props.handleEditTime(this.state.data)
  };

  render() {
    const datesWorked = Object.keys(this.state.data);

    return (
      <div className="edit-display">
        <form onSubmit={this.handleClickSubmit}>
          <input
            id="date"
            value={this.state.date}
            onChange={this.handleOnChange}
            type="date"
            placeholder="Date"
          />
          <input
            id="mins"
            min={0}
            value={this.state.mins}
            onChange={this.handleOnChange}
            type="number"
            placeholder="Minutes"
          />
          <button className="btn btn-primary">Submit</button>
        </form>
        <ul>
          {datesWorked.map((d) => (
            <li key={d}>
              {d + " : " + this.state.data[d]} <button>Edit</button>
              <button>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default AddTimeForm;
