import React, { Component } from "react";
import { getAllTasks } from "../services/taskService";
import auth from "../services/authService";
import { Pie, Bar } from "react-chartjs-2";
import { ReactComponent as PomodoroSvg } from "../assets/tomato-svgrepo-com.svg";

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
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
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
    monthTotal: "",
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
          label: "Minutes",
          backgroundColor: this.COLORS_MONTH,
          barPercentage: 0.05,
          barThickness: 50,
          data: [],
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

      const minsThisWeek = this.getThisWeek(allMinsObj);
      const weekData = { ...this.state.weekData };
      weekData.datasets = [...weekData.datasets];
      weekData.datasets[0] = { ...this.state.weekData.datasets[0] };
      weekData.datasets[0].data = minsThisWeek;

      const minsThisYear = this.getThisYear(allMinsObj);
      const yearData = { ...this.state.yearData };
      yearData.datasets = [...this.state.yearData.datasets];
      yearData.datasets[0] = { ...this.state.yearData.datasets[0] };
      yearData.datasets[0].data = minsThisYear;

      const todayTotal = this.getToday(allMinsObj);
      const weekTotal = minsThisWeek.reduce((acc, curr) => acc + curr, 0);
      const monthTotal = minsThisYear[this.CURR_MONTH - 1];
      const yearTotal = minsThisYear.reduce((acc, curr) => acc + curr, 0);
      const total = this.getTotal(allMinsObj);

      this.setState({
        todayTotal,
        weekTotal,
        monthTotal,
        yearTotal,
        total,
        weekData,
        yearData,
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
    const sinceThisMonday =
      Date.parse(this.TODAY) - 1000 * 60 * 60 * 24 * (this.CURR_DAY + 0.5);

    const MINS_EACH_DAY = [0, 0, 0, 0, 0, 0, 0];

    const minsThisWeek = allMinsObj.reduce(
      (acc, curr) => {
        if (curr) {
          let dates = Object.keys(curr);
          dates.forEach(
            (date) =>
              Date.parse(date) > sinceThisMonday &&
              (acc[new Date(date).getDay()] += parseInt(curr[date]))
          );
        }
        return acc;
      },

      MINS_EACH_DAY
    );

    return minsThisWeek;
  };

  getThisYear = (allMinsObj) => {
    const MINS_EACH_MONTH = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const minsThisYear = allMinsObj.reduce((acc, curr) => {
      if (curr) {
        let dates = Object.keys(curr);
        dates.forEach(
          (date) =>
            parseInt(date.substring(0, 4)) === this.CURR_YEAR &&
            (acc[parseInt(date.substring(5, 7)) - 1] += parseInt(curr[date]))
        );
      }
      return acc;
    }, MINS_EACH_MONTH);

    return minsThisYear;
  };

  getTotal = (allMinsObj) => {
    const total = allMinsObj.reduce((acc, curr) => {
      if (curr) {
        let dates = Object.keys(curr);
        dates.forEach((date) => (acc += parseInt(curr[date])));
      }
      return acc;
    }, 0);

    return total;
  };

  render() {
    return (
      <div className="reportC component">
        <div className="reportPomo">
          <i>Keep up the great work!</i>
          <br />
          <i>
            Each pomodoro is 25 mins of work...try to slowly increase the #.
          </i>
          <h3>Pomodoros today ({this.state.todayTotal / 25}): </h3>
          <span>
            {" "}
            {[...Array(parseInt(this.state.todayTotal / 25))].map((e, i) => (
              <span className="pomo" key={i}>
                <PomodoroSvg width="60px" alt={i + 1} />
              </span>
            ))}
          </span>
          <p>
            <a href={"https://www.svgrepo.com/svg/52746/tomato"}>
              @pomodoro_svg_source
            </a>
          </p>
        </div>
        <div className="reportNumbers">
          <p>
            <i>Hours worked today, this week, this month, and in total</i>{" "}
          </p>

          <table className="table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Span</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{(this.state.todayTotal / 60).toFixed(2)} hrs</td>
                <td>Today</td>
              </tr>
              <tr>
                <td>{(this.state.weekTotal / 60).toFixed(2)} hrs</td>
                <td>Week</td>
              </tr>
              <tr>
                <td>{(this.state.monthTotal / 60).toFixed(2)} hrs</td>
                <td>Month - {this.MONTHS_OF_YEAR[this.CURR_MONTH - 1]}</td>
              </tr>
              <tr>
                <td>{(this.state.yearTotal / 60).toFixed(2)} hrs</td>
                <td>Year - {this.CURR_YEAR}</td>
              </tr>
              <tr>
                <td>{(this.state.total / 60).toFixed(2)} hrs</td>
                <td>Total</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="reportWeekChart">
          <h1>Stats for this week</h1>
          <Pie data={this.state.weekData} />
        </div>

        <div className="reportYearChart">
          <h1>Stats for months this year</h1>
          <Bar
            data={this.state.yearData}
            options={{
              legend: {
                display: false,
              },
            }}
          />
        </div>
      </div>
    );
  }
}

export default Report;

//hrs based on task - on each task
//hrs based on goal

//this month, last month => hrs for each month
//option to choose this year, last year(s)
