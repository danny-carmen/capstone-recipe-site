import React, { Component } from "react";

export default class FilterFieldServings extends Component {
  constructor() {
    super();

    this.state = {
      active: "FALSE",
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (e) => {
    this.props.handleFieldClick(e.currentTarget, "servingsActive");
  };

  render() {
    return (
      <div
        className="filter-field filter-field__inactive filter-field__servings"
        onClick={this.handleClick}
      >
        Servings: MIN - MAX
      </div>
    );
  }
}
