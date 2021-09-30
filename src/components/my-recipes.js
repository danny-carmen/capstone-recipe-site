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
    return (
      <div className="user-recipes-wrapper">
        {this.props.recipes.length > 0 ? (
          <div className="user-recipes">{userRecipeItems}</div>
        ) : (
          <div className="none-found-wrapper">
            <div>
              No recipes by this user yet. Click the account button to add a
              recipe!
            </div>
          </div>
        )}
      </div>
    );
  }
}
