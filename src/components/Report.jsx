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
          data: [],
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

  TODAY = new Date();
  CURR_DAY = this.TODAY.getDay();
  CURR_DATE = this.TODAY.getDate();
  CURR_MONTH = this.TODAY.getMonth() + 1;
  CURR_YEAR = this.TODAY.getFullYear();

  DAYS_OF_WEEK = ["mon", "tue", "wed", "thur", "fri", "sat", "sun"];
  COLORS_WEEK = [
    "#FFF6B7",
    "#bbd7d1",
    "#fcdabc",
    "#e4d0c3",
    "#cfc5f8",
    "#c0d4f7",
    "#fac5cc",
  ];
  MONTHS_OF_YEAR = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sept",
    "oct",
    "nov",
    "dec",
  ];

  async componentDidMount() {
    const user = auth.getCurrentUser();
    if (user) {
      const { data: taskList } = await getAllTasks(user._id);

      const minsThisWeek = this.getThisWeek(taskList);
      const weekTotal = minsThisWeek.reduce((acc, curr) => acc + curr, 0);

      const data = { ...this.state.data };
      data.datasets[0].data = minsThisWeek;

      this.setState({
        weekTotal,
        data,
      });
    }
  }

  getThisWeek = (taskList) => {
    const sinceThisMonday = new Date(
      Date.now() - 1000 * 60 * 60 * 24 * this.CURR_DAY + 1
    );

    const allMinsObj = taskList.reduce(
      (array, task) => array.concat(task["minsWorked"]),
      []
    );

    const minsThisWeek = allMinsObj.reduce(
      (acc, curr) => {
        if (curr) {
          let dates = Object.keys(curr);
          dates.forEach((date) =>
            new Date(date) > sinceThisMonday
              ? (acc[new Date(date).getDay()] += parseInt(curr[date]))
              : console.log("before last week", date, curr[date])
          );
        }
        return acc;
      },

      [0, 0, 0, 0, 0, 0, 0]
    );

    return minsThisWeek;
  };

  render() {
    //hours today
    //yesterday
    //this month
    //last month
    //total
    return (
      <div className="reportPage">
        <h1>{"Hours this week: " + (this.state.weekTotal / 60).toFixed(2)}</h1>

        <Pie data={this.state.data} width={150} height={50} />
      </div>
    );
  }
}

export default Report;

//hrs based on task

//total hours worked total
//hrs based on goal
//hrs today - this week / option to choose last week1
//hrs for each month / option to choose this year, last year(s)
