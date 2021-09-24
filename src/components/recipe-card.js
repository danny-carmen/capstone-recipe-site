import React, { Component } from "react";
import Author from "./author";
import RecipeTime from "./recipe-time";
import Servings from "./servings";
import RecipeTitle from "./title";

import { Link } from "react-router-dom";

export default class RecipeCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      _id,
      recipeImage,
      recipeAuthor,
      recipeServings,
      recipeTitle,
      recipeActiveTime,
      recipeTotalTime,
    } = this.props.boardItem;

    return (
      <Link className="recipe-card__link" to={`/recipes/${_id}`}>
        <div className="recipe-card">
          <img src={recipeImage} alt={recipeTitle} />

          <RecipeTitle className="recipe-card__title" title={recipeTitle} />

          <Servings
            className="recipe-card__servings"
            servings={recipeServings}
          />
          <Author className="recipe-card__author" author={recipeAuthor} />
          <RecipeTime
            className="recipe-card__active-time"
            type="Active"
            time={recipeActiveTime}
          />
          <RecipeTime
            className="recipe-card__total-time"
            type="Total"
            time={recipeTotalTime}
          />
        </div>
      </Link>
    );
  }
}
