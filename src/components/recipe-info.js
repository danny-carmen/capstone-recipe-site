import React, { Component } from "react";
import Author from "./author";
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
    const {
      recipeDescription,
      recipeTitle,
      recipeServings,
      recipeActiveTime,
      recipeTotalTime,
      recipeAuthor,
    } = this.state.recipe;
    return (
      <div className="recipe-info">
        <div className="recipe-info__title">{recipeTitle}</div>
        <Author className="recipe-info__author" author={recipeAuthor} />
        <div className="recipe-info__description">{recipeDescription}</div>
        <Servings className="recipe-info__servings" servings={recipeServings} />

        <RecipeTime
          className="recipe-info__time"
          type="Active"
          time={recipeActiveTime}
        />
        <RecipeTime
          className="recipe-info__time"
          type="Total"
          time={recipeTotalTime}
        />
      </div>
    );
  }
}
