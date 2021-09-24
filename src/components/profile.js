import React, { Component } from "react";
import lasagna from "../images/lasagna.jpg";
import AccountInfo from "./account-info";
import MyRecipes from "./my-recipes";

export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      openWindow: "my-recipes",
    };

    this.handleMyAccountButtonClick =
      this.handleMyAccountButtonClick.bind(this);
    this.handleMyRecipesClick = this.handleMyRecipesClick.bind(this);
  }
  handleMyAccountButtonClick(e) {
    if (this.state.openWindow !== "account") {
      this.setState({
        openWindow: "account",
      });
    }
  }

  handleMyRecipesClick(e) {
    if (this.state.openWindow !== "my-recipes") {
      this.setState({
        openWindow: "my-recipes",
      });
    }
  }
  render() {
    const userRecipes = [
      {
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
      },
      {
        id: 2,
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
      },
      {
        id: 3,
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
      },
      {
        id: 4,
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
      },
      {
        id: 5,
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
      },
      {
        id: 6,
        recipeVersion: "1.0",
        title: "Lasagna",
        servings: "4",
        activeTime: "40 min",
        totalTime: "60 min",
        image:
          "https://tastable-recipe-images.s3.us-west-2.amazonaws.com/614ca35d70a0b5ba3d0626fd.jpeg",
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
      },
      {
        id: 7,
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
      },
    ];
    return (
      <div className="profile-wrapper">
        <div className="selection-options">
          <button
            className={this.state.openWindow === "my-recipes" ? "selected" : ""}
            onClick={this.handleMyRecipesClick}
          >
            MY RECIPES
          </button>
          <button
            className={this.state.openWindow === "account" ? "selected" : ""}
            onClick={this.handleMyAccountButtonClick}
          >
            MY ACCOUNT
          </button>
        </div>
        <div className="flip-window">
          {this.state.openWindow === "account" ? (
            <AccountInfo />
          ) : (
            <MyRecipes recipes={userRecipes} />
          )}
        </div>
      </div>
    );
  }
}
