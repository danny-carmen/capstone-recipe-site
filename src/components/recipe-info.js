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
    const { recipeServings, recipeActiveTime, recipeTotalTime, recipeAuthor } =
      this.state.recipe;
    return (
      <div className="recipe-info">
        <div>
          <Servings servings={recipeServings} />
          <Author author={recipeAuthor} />
          <RecipeTime type="Active" time={recipeActiveTime} />
          <RecipeTime type="Total" time={recipeTotalTime} />
        </div>
      </div>
    );
  }
}
