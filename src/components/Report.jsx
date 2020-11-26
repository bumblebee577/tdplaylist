import React, { Component } from "react";
import { getAllTasks } from "../services/taskService";
import auth from "../services/authService";
import { Pie, Bar } from "react-chartjs-2";

class Report extends Component {
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
  COLORS_MONTH = [
    "#FFF6B7",
    "#bbd7d1",
    "#fcdabc",
    "#e4d0c3",
    "#cfc5f8",
    "#c0d4f7",
    "#fac5cc",
    "#FFF6B7",
    "#bbd7d1",
    "#fcdabc",
    "#e4d0c3",
    "#cfc5f8",
    "#c0d4f7",
    "#fac5cc",
  ];

  state = {
    todayTotal: "",
    weekTotal: "",
    yearTotal: "",
    total: "",
    weekData: {
      labels: this.DAYS_OF_WEEK,
      datasets: [
        {
          label: "days of week",
          data: [],
          backgroundColor: this.COLORS_WEEK,
        },
      ],
    },
    yearData: {
      labels: this.MONTHS_OF_YEAR,
      datasets: [
        {
          barPercentage: 0.05,
          barThickness: 50,
          data: [10, 20, 30, 40, 50, 60, 70],
        },
      ],
    },
  };

  async componentDidMount() {
    const user = auth.getCurrentUser();
    if (user) {
      const { data: taskList } = await getAllTasks(user._id);

      const allMinsObj = taskList.reduce(
        (array, task) => array.concat(task["minsWorked"]),
        []
      );

      const todayTotal = this.getToday(allMinsObj);
      const minsThisWeek = this.getThisWeek(allMinsObj);
      const weekTotal = minsThisWeek.reduce((acc, curr) => acc + curr, 0);

      const weekData = { ...this.state.weekData };
      weekData.datasets[0].data = minsThisWeek;

      this.setState({
        todayTotal,
        weekTotal,
        weekData,
      });
    }
  }

  getToday = (allMinsObj) => {
    const sinceToday =
      this.CURR_YEAR + "-" + this.CURR_MONTH + "-" + this.CURR_DATE;

    const minsToday = allMinsObj.reduce((acc, curr) => {
      if (curr && curr[sinceToday]) {
        acc += parseInt(curr[sinceToday]);
      }
      return acc;
    }, 0);
    return minsToday;
  };

  getThisWeek = (allMinsObj) => {
    const sinceThisMonday = new Date(
      this.TODAY - 1000 * 60 * 60 * 24 * this.CURR_DAY + 1
    );

    const minsThisWeek = allMinsObj.reduce(
      (acc, curr) => {
        if (curr) {
          let dates = Object.keys(curr);
          dates.forEach(
            (date) =>
              new Date(date) > sinceThisMonday &&
              (acc[new Date(date).getDay()] += parseInt(curr[date]))
          );
        }
        return acc;
      },

      [0, 0, 0, 0, 0, 0, 0]
    );

    return minsThisWeek;
  };

  render() {
    return (
      <div className="reportPage">
        <div className="reportTotal">
          <h1>{"Total: "}</h1>
        </div>
        <div className="reportTdoay">
          <h1>
            Badges Today:
            {[...Array(this.state.todayTotal / 25)].map((e) => (
              <i
                className="fa fa-superpowers"
                aria-hidden="true"
                key={e + ""}
              />
            ))}
          </h1>
        </div>
        <div className="reportWeek">
          <h1>
            {"Hours this week: " + (this.state.weekTotal / 60).toFixed(2)}
          </h1>

          <Pie data={this.state.weekData} width={150} height={50} />
        </div>

        <div className="reportYear">
          <h1>{"Hours this by Month this Year: "}</h1>
          <Bar data={this.state.yearData} width={200} height={50} />
        </div>
      </div>
    );
  }
}

export default Report;

//hrs based on task - on each task

//total hours worked total
//hrs based on goal
//option to choose last week1
//this montt, last month => hrs for each month / option to choose this year, last year(s)
