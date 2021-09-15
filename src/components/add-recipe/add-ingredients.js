import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faCaretUp,
  faCaretDown,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

export default class AddIngredients extends Component {
  constructor(props) {
    super(props);

    this.addIngredient = this.addIngredient.bind(this);
    this.changeIngredientPosition = this.changeIngredientPosition.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
    this.updateIngredientIndices = this.updateIngredientIndices.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      newQuantity: "",
      newUnit: "",
      newIngredient: "",
      errorMessage: "",
    };
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  addIngredient() {
    const quantity = this.state.newQuantity;
    const unit = this.state.newUnit;
    const ingredient = this.state.newIngredient;
    const idx = this.props.ingredients.length;

    if (quantity && ingredient) {
      const newIngredient = { idx, ingredient, quantity, unit };

      this.props.addIngredientList([...this.props.ingredients, newIngredient]);
    }
    //if leading to error message, can replace one above
    //start large if then return chain, if it makes it all the way through then it can continue to set state and add to list
    //if ingredient or quantity is blank
    // if quantity doesn't have good value
    // if
    this.setState({
      newQuantity: "",
      newUnit: "",
      newIngredient: "",
    });
  }

  changeIngredientPosition(idx, moveUp) {
    let updatedIngredients = [...this.props.ingredients];

    if (moveUp && idx > 0) {
      const ingredientToMoveUp = updatedIngredients.splice(idx, 1)[0];
      updatedIngredients.splice(idx - 1, 0, ingredientToMoveUp);
    } else if (!moveUp && idx <= updatedIngredients.length) {
      const ingredientToMoveDown = updatedIngredients.splice(idx, 1)[0];
      updatedIngredients.splice(idx + 1, 0, ingredientToMoveDown);
    }
    updatedIngredients = this.updateIngredientIndices(updatedIngredients);

    this.props.addIngredientList(updatedIngredients);
  }

  removeIngredient(idx) {
    let updatedIngredients = [...this.props.ingredients];
    updatedIngredients.splice(idx, 1);
    this.updateIngredientIndices(updatedIngredients);

    this.props.addIngredientList(updatedIngredients);
  }

  updateIngredientIndices(ingredientArray) {
    const updatedIndexIngredients = ingredientArray.map(
      (ingredientObject, idx) => {
        ingredientObject.idx = idx;
        return ingredientObject;
      }
    );
    return updatedIndexIngredients;
  }

  createErrorMessage() {}

  render() {
    const ingredientList = this.props.ingredients.map((ingredient, idx) => {
      return (
        <div key={idx} className="ingredient-list__ingredient">
          <button
            className="remove-ingredient"
            onClick={() => {
              this.removeIngredient(idx);
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className="up-down-buttons">
            <button
              onClick={() => {
                this.changeIngredientPosition(idx, true);
              }}
            >
              <FontAwesomeIcon icon={faCaretUp}></FontAwesomeIcon>
            </button>
            <button
              onClick={() => {
                this.changeIngredientPosition(idx, false);
              }}
            >
              <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
            </button>
          </div>
          {"   "}
          {ingredient.quantity} {ingredient.unit} {ingredient.ingredient}{" "}
        </div>
      );
    });
    return (
      <div className="add-ingredient">
        <div className="title">INGREDIENTS</div>

        <div className="ingredient-list">{ingredientList}</div>
        <div className="add-ingredient-inputs">
          <div className="add-ingredient-input add-ingredient__quantity">
            <label for="add-ingredient-quantity-input">Qty.</label>
            <input
              id="add-ingredient-quantity-input"
              className="quantity"
              name="newQuantity"
              type="text"
              value={this.state.newQuantity}
              onChange={this.handleChange}
            />{" "}
          </div>

          <div className="add-ingredient-input add-ingredient__unit">
            <label for="add-ingredient-unit-input">Unit</label>
            <input
              id="add-ingredient-unit-input"
              className="unit"
              name="newUnit"
              type="text"
              value={this.state.newUnit}
              onChange={this.handleChange}
            />{" "}
          </div>

          <div className="add-ingredient-input add-ingredient__ingredient">
            <label for="add-ingredient-ingredient-input">Ingredient</label>
            <input
              id="add-ingredient-ingredient-input"
              className="ingredient"
              name="newIngredient"
              type="text"
              value={this.state.newIngredient}
              onChange={this.handleChange}
            />{" "}
          </div>
          <button
            className="add-ingredient-button"
            onClick={this.addIngredient}
          >
            ADD INGREDIENT
          </button>
        </div>

        <div className="add-ingredient__error-message">
          {this.state.errorMessage}
        </div>
      </div>
    );
  }
}
