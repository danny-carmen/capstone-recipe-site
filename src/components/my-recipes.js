import React, { Component } from "react";

import UserRecipe from "./user-recipe";

export default class MyRecipes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: "",
    };

    this.reloadRecipes = this.reloadRecipes.bind(this);
  }

  reloadRecipes() {
    debugger;
    this.props.reloadRecipes();
  }

  render() {
    const userRecipeItems = this.props.recipes.map((recipe) => {
      return (
        <UserRecipe
          recipe={recipe}
          reloadRecipes={() => this.reloadRecipes()}
        />
      );
    });
    return <div className="user-recipes">{userRecipeItems}</div>;
  }
}
