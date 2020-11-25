import React, { Component } from "react";
import { getAllTasks } from "../services/taskService";
import auth from "../services/authService";
import { Pie } from "react-chartjs-2";

class Report extends Component {
  state = {
    weekTotal: "",
    yearTotal: "",
    total: "",
    data: {
      labels: ["mon", "tue", "wed", "thur", "fri", "sat", "sun"],
      datasets: [
        {
          label: "days of week",
          data: [0],
          backgroundColor: [
            "#FFF6B7",
            "#bbd7d1",
            "#fcdabc",
            "#e4d0c3",
            "#cfc5f8",
            "#c0d4f7",
            "#fac5cc",
          ],
        },
      ],
    },
  };

  async componentDidMount() {
    const user = auth.getCurrentUser();
    if (user) {
      const { data: taskList } = await getAllTasks(user._id);

      // const minsThisWeek= taskList.filter(t => )

      const arrOfMinObj = taskList.reduce(
        (array, task) => array.concat(task["minsWorked"]),
        []
      );
      const arrOfMins = arrOfMinObj.reduce(
        (acc, curr) => (curr ? acc.concat(Object.values(curr)) : acc),
        []
      );

      const total = arrOfMins.reduce((acc, curr) => acc + curr, 0);
      const data = { ...this.state.data };
      data.datasets[0].data = [5, 7, 10, 4, 8, 6, 6];

      console.log(data);

      this.setState({
        total,
        data,
      });
    }
  }

  render() {
    const dayofweek = new Array(7);
    const monthofyear = new Array(12);

    return (
      <div className="reportPage">
        <h1>{"Total Hours: " + this.state.total}</h1>
        <Pie data={this.state.data} width={150} height={50} />
      </div>
    );
  }
}

export default Report;

//this week -> breakdown of days

//total hours worked today, yesterday, this week, this month, this year
// total hours worked total
//hrs worked based on goal
//
