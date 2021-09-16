import React, { Component } from "react";

import UserRecipe from "./user-recipe";

export default class MyRecipes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: "",
    };
  }

  render() {
    const userRecipeItems = this.props.recipes.map((recipe) => {
      return <UserRecipe recipe={recipe} />;
    });
    return (
      <div className="user-recipes">
        <div>{userRecipeItems}</div>
      </div>
    );
  }
}
