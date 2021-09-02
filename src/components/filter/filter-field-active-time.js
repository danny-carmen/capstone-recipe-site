import React, { Component } from "react";

export default class FilterFieldActiveTime extends Component {
  constructor() {
    super();

    this.state = {
      active: "FALSE",
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (e) => {
    this.props.handleFieldClick(e.currentTarget, "activeTimeActive");
  };

  render() {
    return (
      <div
        className="filter-field filter-field__inactive filter-field__servings"
        onClick={this.handleClick}
      >
        <div>Active Time</div>

        <div>
          <input type="text" placeholder="Min" /> min. -{" "}
          <input type="text" placeholder="Max" /> min.
        </div>
      </div>
    );
  }
}
