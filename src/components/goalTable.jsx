import React from "react";
import Table from "../templates/table";
import { Link } from "react-router-dom";

class GoalTable extends Table {
  state = {
    goalName: "",
    columns: [
      { id: "num", label: "#" },
      { id: "name", label: "Name" },
      { id: "dueDate", label: "Due Date" },
    ],
    sortBy: { id: "name", order: "asc" },
  };

  sendAddItem = () => {
    this.props.handleAddGoal({ name: this.state.goalName });
    this.setState({
      goalName: "",
    });
  };

  render() {
    return (
      <div className="itemTable">
        <div className="input-group mb-3 newTaskGroup">
          <input
            type="text"
            className="form-control border border-dark"
            id="title"
            value={this.state.goalName}
            onChange={(event) =>
              this.setState({ goalName: event.target.value })
            }
            placeholder="New goal name"
          />
          <div className="input-group-append mb-3">
            <button
              className="btn btn-outline-primary"
              onClick={() => this.sendAddItem()}
            >
              Add Goal
            </button>
          </div>
          <Link to="/goalForm" className="newGoal ">
            <button className="btn btn-primary">New Goal</button>
          </Link>
        </div>

        <table className="table">
          {this.renderHeader()}

          <tbody>
            {this.props.goalList.map((g, i) => (
              <tr
                key={"row" + i + 1}
                className={g.status === "completed" ? "complete" : "incomplete"}
              >
                <td className="num" key={i + 1}>
                  {i + 1}
                </td>
                <td className="name" key={i + 1 + "name"}>
                  <Link to={`/goalForm/${g.ownerId}/${g._id}`}> {g.name} </Link>
                </td>
                <td className="dueDate" key={i + 1 + "dueDate"}>
                  {this.formatDate(g.dueDate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default GoalTable;
