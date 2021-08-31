import React, { Component } from "react";
import RecipeDirections from "./recipe-directions";
import RecipeInfo from "./recipe-info";
import RecipeIngredients from "./recipe-ingredients";

import lasagna from "../images/lasagna.jpg";
import RecipeImage from "./recipe-image";

export default class RecipePage extends Component {
  constructor() {
    super();

    const recipeObject = {
      id: 1,
      recipeVersion: "1.0",
      title: "Lasagna",
      servings: "4",
      activeTime: "40 min",
      totalTime: "60 min",
      image: lasagna,
      rating: "4",
      ingredients: [
        { ingredient: "Lasagna Noodles", quantity: "12" },
        { ingredient: "Sauce", quantity: "12 oz" },
        { ingredient: "Another ingredient", quantity: "12 oz" },
        { ingredient: "Another ingredient", quantity: "1 cup" },
        { ingredient: "Another ingredient", quantity: "12 grams" },
        { ingredient: "Another ingredient", quantity: "12 milliliters" },
        { ingredient: "Another ingredient", quantity: "12 schrute buck" },
        { ingredient: "Another ingredient", quantity: "12 stanley nickels" },
      ],
      directions: [
        "Preheat oven to a temperature.",
        "Eat a banana while waiting.",
        "Put lasagna into the oven.",
        "Stare hungrily at the lasagna.",
        "Take lasagna out, but don't eat it yet you fat lard, let it cool.",
      ],
    };

    this.state = {
      recipe: recipeObject,
    };
  }

  render() {
    return (
      <div className="recipe-page-wrapper">
        <div className="recipe-page">
          <RecipeImage image={this.state.recipe.image} />
          <RecipeInfo recipe={this.state.recipe} />
          <RecipeIngredients ingredients={this.state.recipe.ingredients} />
          <RecipeDirections directions={this.state.recipe.directions} />
        </div>
      </div>
    );
  }
}
