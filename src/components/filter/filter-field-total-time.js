import React, { Component } from "react";

export default class FilterFieldTotalTime extends Component {
  constructor() {
    super();

    this.state = {
      active: "FALSE",
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (e) => {
    this.props.handleFieldClick(e.currentTarget, "totalTimeActive");
  };

  render() {
    return (
      <div
        className="filter-field filter-field__inactive filter-field__servings"
        onClick={this.handleClick}
      >
        <div>Total Time</div>

        <div>
          <input type="text" placeholder="Min" /> min. -{" "}
          <input type="text" placeholder="Max" /> min.
        </div>
      </div>
    );
  }
}