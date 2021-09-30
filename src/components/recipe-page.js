import React, { Component } from "react";
import RecipeDirections from "./recipe-directions";
import RecipeInfo from "./recipe-info";
import RecipeIngredients from "./recipe-ingredients";
import axios from "axios";

import lasagna from "../images/lasagna.jpg";
import RecipeImage from "./recipe-image";

export default class RecipePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      recipe: "",
    };
  }

  componentWillMount() {
    axios
      .get(
        "https://ddc-tastable.herokuapp.com/recipes/" +
          this.props.match.params.id
      )
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
