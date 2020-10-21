import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";

class Report extends Component {
  state = {
    reportData: {
      labels: ["monday", "tuesday", "wednesday", "thursday"],
      datasets: [
        {
          label: "days of week",
          data: [600, 700, 400, 500, 800],
          backgroundColor: ["rgba(255,99,132, 0.6)"],
        },
      ],
    },
  };
  render() {
    return (
      <div className="reportPage">
        <h1>Report</h1>
        <Pie data={this.state.reportData} width={100} height={50} />
      </div>
    );
  }
}

export default Report;
