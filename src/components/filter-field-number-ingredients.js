import React, { Component } from "react";

export default class FilterFieldNumberIngredients extends Component {
  constructor() {
    super();

    this.state = {
      active: "FALSE",
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (e) => {
    this.props.handleFieldClick(e.currentTarget, "numberIngredientsActive");
  };

  render() {
    return (
      <div
        className="filter-field filter-field__inactive filter-field__numberIngredients"
        onClick={this.handleClick}
      >
        Number of Ingredients: MIN - MAX
      </div>
    );
  }
}
