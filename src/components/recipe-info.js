import React, { Component } from "react";
import Rating from "./rating";
import RecipeTime from "./recipe-time";
import Servings from "./servings";

export default class RecipeInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: this.props.recipe,
    };
  }
  render() {
    const { servings, activeTime, totalTime, rating } = this.state.recipe;
    return (
      <div className="recipe-info">
        <div>
          <Servings servings={servings} />
          <Rating rating={rating} />
          <RecipeTime type="Active" time={activeTime} />
          <RecipeTime type="Total" time={totalTime} />
        </div>
      </div>
    );
  }
}
