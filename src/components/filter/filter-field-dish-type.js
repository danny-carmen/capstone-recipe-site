import React, { Component } from "react";

export default class FilterFieldDishType extends Component {
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
        <div>Dish Type</div>
        <select>
          <option value="none"> </option>
          <option value="American">American</option>
          <option value="Chinese">Chinese</option>
          <option value="Indian">Indian</option>
          <option value="Mexican">Mexican</option>
          <option value="Italian">Italian</option>
        </select>
      </div>
    );
  }
}
