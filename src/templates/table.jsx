import React, { Component } from "react";
import "./table.css";

class Table extends Component {
  state = {
    columns: [],
    sortBy: {},
  };

  sendAddItem = () => {};

  formatDate = (dateString) => {
    if (!dateString) return "None";
    let year = dateString.substring(0, 4);
    year = parseInt(year);
    let currentYear = new Date().getFullYear();
    if (year < currentYear) return "None";

    return dateString.substring(0, 10);
  };

  sortColumns = (sortId) => {
    console.log(sortId);
    console.log("implement sort function");
  };

  renderSortIcon = () => {
    if (this.state.sortBy.order === "asc") {
      return <i className="fa fa-sort-asc" aria-hidden="true"></i>;
    } else {
      return <i className="fa fa-sort-desc" aria-hidden="true"></i>;
    }
  };

  renderHeader = () => {
    return (
      <thead>
        <tr>
          {this.state.columns.map((h, i) => (
            <th scope="col" key={i} onClick={() => this.sortColumns(h.id)}>
              {h.label} {this.state.sortBy.id === h.id && this.renderSortIcon()}
            </th>
          ))}
        </tr>
      </thead>
    );
  };
}

export default Table;
