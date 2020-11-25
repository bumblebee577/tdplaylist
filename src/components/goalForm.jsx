import React from "react";
import Form from "../templates/form";
import Joi from "joi-browser";
import { getOneGoal } from "../services/goalService";

class GoalForm extends Form {
  state = {
    data: {
      _id: "",
      ownerId: "",
      name: "",
      status: "new",
      dueDate: "",
    },
    errors: {},
  };

  async componentDidMount() {
    if (this.props.match.params.id) {
      let { data } = await getOneGoal(
        this.props.match.params.ownerId,
        this.props.match.params.id
      );

      data = data[0];

      const dueYear = data.dueDate ? data.dueDate.substring(0, 4) : 0;

      this.setState({
        data: {
          _id: data._id,
          ownerId: data.ownerId,
          name: data.name,
          status: data.status,
          dueDate: dueYear > 2000 ? data.dueDate.substring(0, 10) : "",
        },
      });
    }
  }

  schema = {
    _id: Joi.string().allow(""),
    ownerId: Joi.string().allow(""),
    name: Joi.string().required(),
    status: Joi.string().required(),
    dueDate: Joi.date().allow(""),
  };

  handleSubmitForm = () => {
    this.props.handleAddGoal(this.state.data);
    this.props.history.push("/goals");
    console.log("successful submit");
  };

  render() {
    return (
      <div className="formPage">
        <form className="formContent" onSubmit={this.handleClickSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderSelection("status", "Status", [
            "new",
            "inprogress",
            "onhold",
            "completed",
          ])}
          {this.renderInput("dueDate", "Due Date", { type: "date" })}

          {this.renderBtn("submit", "Submit", "btn btn-primary")}
        </form>
      </div>
    );
  }
}

export default GoalForm;
