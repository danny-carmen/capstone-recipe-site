import React, { Component } from "react";
import RecipeDirections from "./recipe-directions";
import RecipeInfo from "./recipe-info";
import RecipeIngredients from "./recipe-ingredients";
import axios from "axios";

import lasagna from "../images/lasagna.jpg";
import RecipeImage from "./recipe-image";
//TODO add author to recipe- style page

export default class RecipePage extends Component {
  constructor(props) {
    super(props);

    // const recipeObject = {
    //   id: 1,
    //   recipeVersion: "1.0",
    //   recipeAuthor: "",
    //   recipeTitle: "Lasagna",
    //   recipeServings: "4",
    //   recipeActiveTime: "40 min",
    //   recipeTotalTime: "60 min",
    //   recipeImage: lasagna,
    //   recipeIngredients: [
    //     { ingredient: "Lasagna Noodles", quantity: "12" },
    //     { ingredient: "Sauce", quantity: "12 oz" },
    //     { ingredient: "Another ingredient", quantity: "12 oz" },
    //     { ingredient: "Another ingredient", quantity: "1 cup" },
    //     { ingredient: "Another ingredient", quantity: "12 grams" },
    //     { ingredient: "Another ingredient", quantity: "12 milliliters" },
    //     { ingredient: "Another ingredient", quantity: "12 schrute buck" },
    //     { ingredient: "Another ingredient", quantity: "12 stanley nickels" },
    //   ],
    //   recipeDirections: [
    //     "Preheat oven to a temperature.",
    //     "Eat a banana while waiting.",
    //     "Put lasagna into the oven.",
    //     "Stare hungrily at the lasagna.",
    //     "Take lasagna out, but don't eat it yet you fat lard, let it cool.",
    //   ],
    // };

    this.state = {
      isLoaded: false,
      recipe: "",
    };
  }

  componentWillMount() {
    console.log("http://localhost:5000/recipes/" + this.props.match.params.id);
    axios
      .get("http://localhost:5000/recipes/" + this.props.match.params.id)
      .then((res) => {
        this.setState({ recipe: res.data, isLoaded: true });
      })
      .catch((err) => console.log(err));
  }

  render() {
    if (this.state.isLoaded) {
      return (
        <div className="recipe-page-wrapper">
          <div className="recipe-page">
            <RecipeImage
              image={this.state.recipe.recipeImage}
              imageAlt={this.state.recipeTitle}
            />
            <RecipeInfo recipe={this.state.recipe} />
            <RecipeIngredients
              ingredients={this.state.recipe.recipeIngredients}
            />
            <RecipeDirections directions={this.state.recipe.recipeDirections} />
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
