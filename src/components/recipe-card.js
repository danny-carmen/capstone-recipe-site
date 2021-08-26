import React, { Component } from "react";
import Rating from "./rating";
import RecipeTime from "./recipe-time";
import Servings from "./servings";
import RecipeTitle from "./title";
import lasagna from "../images/lasagna.jpg";

export default class RecipeCard extends Component {
  componentDidMount() {
    console.log(this.props.boardItem);
  }
  render() {
    // const { image, servings, title, rating, activeTime, totalTime } =
    //   this.props.boardItem;

    // return (
    //   <div className="recipe-card">
    //     <img src="https://via.placeholder.com/360" alt={title} />

    //     <RecipeTitle className="recipe-card__title" title={title} />

    //     <Servings className="recipe-card__servings" servings={servings} />
    //     <Rating className="recipe-card__rating" rating={rating} />
    //     <RecipeTime
    //       className="recipe-card__active-time"
    //       type="Active"
    //       time={activeTime}
    //     />
    //     <RecipeTime
    //       className="recipe-card__total-time"
    //       type="Total"
    //       time={totalTime}
    //     />
    //   </div>
    // );

    return (
      <div className="recipe-card">
        <img src={lasagna} alt={"Lasagna"} />

        <RecipeTitle className="recipe-card__title" title="Lasagna" />

        <Servings className="recipe-card__servings" servings="4" />
        <Rating className="recipe-card__rating" rating="4" />
        <RecipeTime
          className="recipe-card__active-time"
          type="Active"
          time="40 min"
        />
        <RecipeTime
          className="recipe-card__total-time"
          type="Total"
          time="60 min"
        />
      </div>
    );
  }
}
