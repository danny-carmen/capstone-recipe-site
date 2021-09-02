import React, { Component } from "react";

export default class FilterFieldCategory extends Component {
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
        className="filter-field filter-field__inactive filter-field__servings filter-field-dropdown"
        onClick={this.handleClick}
      >
        <div>Category</div>
        <select>
          <option value="none"> </option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
          <option value="Appetizer">Appetizer</option>
          <option value="Dessert">Dessert</option>
          <option value="Side">Side</option>
        </select>
        <div className="field-dropdown"></div>
      </div>
    );
  }
}
