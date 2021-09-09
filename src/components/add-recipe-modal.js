import React, { Component } from "react";
import ReactModal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faCaretUp,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";

export default class AddRecipeModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      servings: "",
      activeTime: "",

      ingredients: [],
      steps: [],
    };

    this.addIngredient = this.addIngredient.bind(this);
    this.changeIngredientPosition = this.changeIngredientPosition.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
    this.updateIngredientIndices = this.updateIngredientIndices.bind(this);
  }

  addIngredient() {
    const quantity = document.getElementById(
      "add-ingredient-quantity-input"
    ).value;
    const unit = document.getElementById("add-ingredient-unit-input").value;
    const ingredient = document.getElementById(
      "add-ingredient-ingredient-input"
    ).value;
    const idx = this.state.ingredients.length;

    if (quantity && ingredient) {
      const newIngredient = { idx, ingredient, quantity, unit };

      this.setState((prevState) => ({
        ingredients: [...prevState.ingredients, newIngredient],
      }));

      document.getElementById("add-ingredient-quantity-input").value = "";
      document.getElementById("add-ingredient-unit-input").value = "";
      document.getElementById("add-ingredient-ingredient-input").value = "";
    }
  }

  changeIngredientPosition(idx, moveUp) {
    let updatedIngredients = [...this.state.ingredients];

    if (moveUp && idx > 0) {
      const ingredientToMoveUp = updatedIngredients.splice(idx, 1)[0];
      updatedIngredients.splice(idx - 1, 0, ingredientToMoveUp);
    } else if (!moveUp && idx <= updatedIngredients.length) {
      const ingredientToMoveDown = updatedIngredients.splice(idx, 1)[0];
      updatedIngredients.splice(idx + 1, 0, ingredientToMoveDown);
    }
    updatedIngredients = this.updateIngredientIndices(updatedIngredients);
    this.setState((prevState) => ({ ingredients: updatedIngredients }));
  }

  removeIngredient(idx) {
    let updatedIngredients = [...this.state.ingredients];
    updatedIngredients.splice(idx, 1);
    this.updateIngredientIndices(updatedIngredients);
    this.setState((prevState) => ({
      ingredients: updatedIngredients,
    }));
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

  render() {
    const ingredientList = this.state.ingredients.map((ingredient, idx) => {
      return (
        <div key={idx} className="ingredient-list__ingredient">
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
          </button>{" "}
          {ingredient.quantity} {ingredient.unit} {ingredient.ingredient}{" "}
          <button
            className="remove-ingredient"
            onClick={() => {
              this.removeIngredient(idx);
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      );
    });

    console.log(this.state.ingredients);
    return (
      <ReactModal
        className="add-recipe-modal"
        onRequestClose={() => {
          this.props.handleModalClose();
        }}
        isOpen={this.props.modalIsOpen}
      >
        <div className="add-recipe-modal-grid">
          <button
            className="modal-close-button"
            onClick={this.props.handleModalClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div>
            <div>
              <label for="recipeTitle">Title:</label>
              <input type="text" id="recipeTitle" name="recipeTitle" />
            </div>
            <div>
              <label for="recipeDescription">Description:</label>
              <textarea
                type="text"
                id="recipeDescription"
                name="recipeDescription"
              ></textarea>
            </div>

            <div>
              <label for="recipeServings">Servings:</label>
              <input type="number" id="recipeServings" name="recipeServings" />
            </div>
            <div>
              <label for="recipeActiveTimeHour">Active Time - Hours:</label>
              <input
                type="number"
                id="recipeActiveTimeHour"
                name="recipeActiveTimeHour"
                value="0"
              />
              <label for="recipeActiveTimeMin">Min:</label>
              <input
                type="number"
                id="recipeActiveTimeMin"
                name="recipeActiveTimeMin"
                max="60"
              />
            </div>

            <div>
              <label for="recipeTotalTimeHour">Total Time - Hours:</label>
              <input
                type="number"
                id="recipeTotalTimeHour"
                name="recipeTotalTimeHour"
                value="0"
              />
              <label for="recipeTotalTimeMin">Min:</label>
              <input
                type="number"
                id="recipeTotalTimeMin"
                name="recipeTotalTimeMin"
                max="60"
              />
            </div>
            <div>
              <div id="ingredient-list">{ingredientList}</div>
              <div>
                <div className="add-ingredient-input add-ingredient__quantity">
                  <label for="add-ingredient-quantity-input">Qty.</label>
                  <input
                    id="add-ingredient-quantity-input"
                    name="add-ingredient-quantity-input"
                    type="text"
                  />{" "}
                </div>

                <div className="add-ingredient-input add-ingredient__unit">
                  <label for="add-ingredient-unit-input">Unit</label>
                  <input
                    id="add-ingredient-unit-input"
                    name="add-ingredient-unit-input"
                    type="text"
                  />{" "}
                </div>

                <div className="add-ingredient-input add-ingredient__ingredient">
                  <label for="add-ingredient-ingredient-input">
                    Ingredient
                  </label>
                  <input
                    id="add-ingredient-ingredient-input"
                    name="add-ingredient-ingredient-input"
                    type="text"
                  />{" "}
                </div>

                <button onClick={this.addIngredient}>Add Ingredient</button>
              </div>
            </div>
          </div>
          {/* Recipe Title
          Image 
          Description
          Servings
          Active Time
          Total Time
          Ingredients
          Directions

          
          */}
        </div>
      </ReactModal>
    );
  }
}
