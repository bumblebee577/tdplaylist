import React from "react";
import Form from "../templates/form";
import { getOneGoal } from "../services/goalService";

class GoalForm extends Form {
  state = {
    data: {},
    errors: {},
  };

  async componentDidMount() {
    if (this.props.match.params.id) {
      const { data } = await getOneGoal(this.props.match.params.id);
      this.setState({
        data: {
          name: data.name,
        },
      });
    }
  }
  render() {
    return (
      <div className="formPage">
        <form className="formContent" onSubmit={this.handleClickSubmit}>
          {this.renderInput("name", "Name")}

          {this.renderBtn("submit", "Submit", "btn btn-primary")}
        </form>
      </div>
    );
  }
}

export default GoalForm;
