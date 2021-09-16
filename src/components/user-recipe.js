import React, { Component } from "react";
import RecipeImage from "./recipe-image";
import RecipeTitle from "./title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import AddRecipeModal from "./add-recipe/add-recipe-modal";

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
  }

  handleEditRecipeModalClose() {
    this.setState({ editRecipeModalIsOpen: false });
  }

  handleEditRecipeModalClick() {
    console.log("I clicked it");
    this.setState({ editRecipeModalIsOpen: true });
  }

  handleDeleteRecipeClick() {}

  render() {
    return (
      <div className="user-recipe-wrapper">
        <AddRecipeModal
          handleModalClose={this.handleEditRecipeModalClose}
          modalIsOpen={this.state.editRecipeModalIsOpen}
          recipe={this.props.recipe}
        />
        <RecipeImage
          image={this.props.recipe.image}
          imageAlt={this.props.recipe.title}
        />
        <RecipeTitle className="title" title={this.props.recipe.title} />
        <div className="buttons">
          <Link to={`/recipes/${this.props.recipe.id}`}>
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
