import React, { Component } from "react";
import RecipeImage from "./recipe-image";
import RecipeTitle from "./title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";

import AddRecipeModal from "./add-recipe/add-recipe-modal";

//remove the modal from here and put on the main my recipes page, with a props function from here

export default class UserRecipe extends Component {
  constructor() {
    super();

    this.state = {
      editRecipeModalIsOpen: false,
    };

    this.handleEditRecipeModalClick =
      this.handleEditRecipeModalClick.bind(this);
    this.handleEditRecipeModalClose =
      this.handleEditRecipeModalClose.bind(this);
    this.handleDeleteRecipeClick = this.handleDeleteRecipeClick.bind(this);
    this.reloadRecipes = this.reloadRecipes.bind(this);
  }

  handleEditRecipeModalClose() {
    this.setState({ editRecipeModalIsOpen: false });
  }

  handleEditRecipeModalClick() {
    this.setState({ editRecipeModalIsOpen: true });
  }

  handleDeleteRecipeClick() {
    axios
      .delete(
        "https://ddc-tastable.herokuapp.com/recipes/" + this.props.recipe._id
      )
      .then(this.reloadRecipes())
      .catch((err) => console.log(err));
  }

  reloadRecipes() {
    this.props.reloadRecipes();
  }

  render() {
    return (
      <div className="user-recipe-wrapper">
        <AddRecipeModal
          handleModalClose={this.handleEditRecipeModalClose}
          modalIsOpen={this.state.editRecipeModalIsOpen}
          recipe={this.props.recipe}
          mode="editRecipe"
          reloadRecipes={() => this.reloadRecipes()}
        />
        <RecipeImage
          image={this.props.recipe.recipeImage}
          imageAlt={this.props.recipe.recipeTitle}
        />
        <RecipeTitle className="title" title={this.props.recipe.recipeTitle} />
        <div className="buttons">
          <Link to={`/recipes/${this.props.recipe._id}`}>
            <FontAwesomeIcon icon={faEye} />
          </Link>
          <button onClick={this.handleEditRecipeModalClick}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button onClick={this.handleDeleteRecipeClick}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    );
  }
}
