import React from "react";
import Table from "../templates/table";
import { Link } from "react-router-dom";

class GoalTable extends Table {
  state = {
    goalTitle: "",
    columns: ["#", "Title", "Date Created"],
  };

  sendAddItem = () => {
    this.props.handleAddGoal({ name: this.state.goalTitle });
    this.setState({
      goalTitle: "",
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
            value={this.state.goalTitle}
            onChange={(event) =>
              this.setState({ goalTitle: event.target.value })
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
              <tr key={"row" + i + 1}>
                <td className="num" key={i + 1}>
                  {i + 1}
                </td>
                <td className="name" key={i + 1 + "name"}>
                  <Link to={`/goalForm/${g._id}`}> {g.name} </Link>
                </td>
                <td className="dateCreated" key={i + 1 + "dateCreated"}>
                  {this.formatDate(g.dateCreated)}
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
