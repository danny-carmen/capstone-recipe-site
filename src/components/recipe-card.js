import React, { Component } from "react";
import Rating from "./rating";
import RecipeTime from "./recipe-time";
import Servings from "./servings";
import RecipeTitle from "./title";

import { Link } from "react-router-dom";

export default class RecipeCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boardItem: this.props.boardItem,
    };
  }
  render() {
    const { id, image, servings, title, rating, activeTime, totalTime } =
      this.state.boardItem;

    return (
      <Link className="recipe-card__link" to={`/recipes/${id}`}>
        <div className="recipe-card">
          <img src={image} alt={title} />

          <RecipeTitle className="recipe-card__title" title={title} />

          <Servings className="recipe-card__servings" servings={servings} />
          <Rating className="recipe-card__rating" rating={rating} />
          <RecipeTime
            className="recipe-card__active-time"
            type="Active"
            time={activeTime}
          />
          <RecipeTime
            className="recipe-card__total-time"
            type="Total"
            time={totalTime}
          />
        </div>
      </Link>
    );
  }
}
