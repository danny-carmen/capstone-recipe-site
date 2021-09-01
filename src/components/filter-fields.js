import React, { Component } from "react";
import FilterFieldIcon from "./filter-field-icon";
import FilterFieldRating from "./filter-field-rating";
import FilterFieldServings from "./filter-field-servings";
import FilterFieldWithIngredients from "./filter-field-with-ingredient";
import FilterFieldWithoutIngredients from "./filter-field-without-ingredients";
import FilterFieldTotalTime from "./filter-field-total-time";
import FilterFieldActiveTime from "./filter-field-active-time";
import FilterFieldNumberIngredients from "./filter-field-number-ingredients";

export default class FilterFields extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filtersActive: "FALSE",
      ratingActive: "FALSE",
      servingsActive: "FALSE",
      withIngredientsActive: "FALSE",
      withoutIngredientsActive: "FALSE",
      numberIngredientsActive: "FALSE",
      activeTimeActive: "FALSE",
      totalTimeActive: "FALSE",
    };

    this.handleFieldClick = this.handleFieldClick.bind(this);
  }

  handleFieldClick(divName, fieldName) {
    divName.classList.toggle("filter-field__inactive");
    divName.classList.toggle("filter-field__active");
    if (this.state[fieldName] === "FALSE") {
      this.setState({ [fieldName]: "TRUE" });
    } else this.setState({ [fieldName]: "FALSE" });

    console.log(this.state);
  }

  render() {
    return (
      <div className="filter-fields">
        <FilterFieldIcon handleFieldClick={this.handleFieldClick} />

        <FilterFieldServings handleFieldClick={this.handleFieldClick} />
        <FilterFieldRating handleFieldClick={this.handleFieldClick} />
        <FilterFieldWithIngredients handleFieldClick={this.handleFieldClick} />
        <FilterFieldWithoutIngredients
          handleFieldClick={this.handleFieldClick}
        />
        <FilterFieldActiveTime handleFieldClick={this.handleFieldClick} />
        <FilterFieldTotalTime handleFieldClick={this.handleFieldClick} />
        <FilterFieldNumberIngredients
          handleFieldClick={this.handleFieldClick}
        />
      </div>
    );
  }
}
