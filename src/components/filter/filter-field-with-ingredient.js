import React, { Component } from "react";

export default class FilterFieldWithIngredients extends Component {
  constructor() {
    super();

    this.state = {
      active: "FALSE",
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (e) => {
    this.props.handleFieldClick(e.currentTarget, "withIngredientsActive");
  };

  render() {
    return (
      <div
        className="filter-field filter-field__inactive filter-field__servings filter-field-dropdown"
        onClick={this.handleClick}
      >
        With Ingredients
      </div>
    );
  }
}
