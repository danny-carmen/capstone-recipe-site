import React, { Component } from "react";

export default class AddRecipeIngredients extends Component {
  constructor() {
    super();

    this.state = {
      ingredients: [],
    };
  }

  addIngredient() {}

  render() {
    return (
      <div>
        Ingredients:
        <div className="ingredients-wrapper">
          <label for="addIngredientQuantity">Qty:</label>
          <input
            type="number"
            name="addIngredientQuantity"
            step="any"
            id="addIngredientQuantity"
            pattern=""
            min="0"
          />
        </div>
      </div>
    );
  }
}
