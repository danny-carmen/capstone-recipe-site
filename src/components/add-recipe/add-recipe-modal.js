import React, { Component } from "react";
import ReactModal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faCaretUp,
  faCaretDown,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import AddIngredients from "./add-ingredients";
import AddDirections from "./add-directions";
import { DropzoneComponent } from "react-dropzone-component";

import filepickerCss from "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import dropzoneCss from "../../../node_modules/dropzone/dist/min/dropzone.min.css";

export default class AddRecipeModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipeTitle: "",
      recipeDescription: "",
      recipeServings: "",
      recipeActiveTime: "",
      recipeTotalTime: "",
      ingredients: [],
      directions: [],
      errorMessage: "",
      recipeImage: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAddIngredientList = this.handleAddIngredientList.bind(this);
    this.handleAddDirectionsList = this.handleAddDirectionsList.bind(this);
    this.handleAddRecipe = this.handleAddRecipe.bind(this);
    this.djsConfig = this.djsConfig.bind(this);
    this.handleImageDrop = this.handleImageDrop.bind(this);
    this.componentConfig = this.componentConfig.bind(this);
    this.recipeImageRef = React.createRef();
  }

  componentConfig() {
    return {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post",
    };
  }

  djsConfig() {
    return {
      addRemoveLinks: true,
      maxFiles: 1,
      dictDefaultMessage: "Upload Recipe Image",
    };
  }

  handleImageDrop() {
    return {
      addedfile: (file) => this.setState({ recipeImage: file }),
    };
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleAddIngredientList(ingredientList) {
    this.setState({
      ingredients: ingredientList,
    });
  }

  handleAddDirectionsList(directionList) {
    this.setState({
      directions: directionList,
    });
  }

  handleAddRecipe() {
    if (!this.state.recipeTitle) {
      this.setState({
        errorMessage: "Please provide a title for this recipe.",
      });
      return;
    }
    if (!this.state.recipeDescription) {
      this.setState({
        errorMessage: "Please provide a description for this recipe.",
      });
      return;
    }
    if (!this.state.recipeActiveTime) {
      this.setState({
        errorMessage: "Please provide an active time for this recipe.",
      });
      return;
    }

    if (!this.state.recipeTotalTime) {
      this.setState({
        errorMessage: "Please provide a total time for this recipe.",
      });
      return;
    }

    if (this.state.ingredients.length < 1) {
      this.setState({
        errorMessage: "Please provide at least one ingredient for this recipe.",
      });
      return;
    }

    if (this.state.directions.length < 1) {
      this.setState({
        errorMessage: "Please provide at least one direction for this recipe.",
      });
      return;
    }

    if (!this.state.recipeImage) {
      this.setState({
        errorMessage: "Please provide an image for this recipe.",
      });
      return;
    }

    const recipeObject = {
      recipeImage: this.state.recipeImage,
      recipeTitle: this.state.recipeTitle,
      recipeDescription: this.state.recipeDescription,
      recipeServings: this.state.recipeServings,
      recipeActiveTime: this.state.recipeActiveTime,
      recipeTotalTime: this.state.recipeTotalTime,
      ingredients: this.state.ingredients,
      directions: this.state.directions,
    };
    debugger;
  }

  render() {
    console.log(this.state.ingredients);
    return (
      <ReactModal
        className="add-recipe-modal"
        shouldCloseOnEsc={false}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => {
          this.props.handleModalClose();
        }}
        isOpen={this.props.modalIsOpen}
      >
        <div className="add-recipe-scroll">
          <div className="add-recipe-modal-grid">
            <div className="title-grid">
              <div className="title">ADD RECIPE</div>
              <button
                className="modal-close-button"
                onClick={this.props.handleModalClose}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="image-uploader">
              <DropzoneComponent
                ref={this.recipeImageRef}
                config={this.componentConfig()}
                eventHandlers={this.handleImageDrop()}
                djsConfig={this.djsConfig()}
              ></DropzoneComponent>
            </div>
            <div className="recipe-info">
              <div className="title">INFORMATION</div>

              <div className="recipe-info-grid">
                <div className="input-and-label title-input">
                  <label for="recipeTitle">Title:</label>
                  <input
                    type="text"
                    id="recipeTitle"
                    name="recipeTitle"
                    value={this.state.recipeTitle}
                    onChange={this.handleChange}
                  />
                </div>

                <div className="input-and-label servings">
                  <label for="recipeServings">Servings:</label>
                  <input
                    type="number"
                    id="recipeServings"
                    name="recipeServings"
                    onChange={this.handleChange}
                    value={this.state.recipeServings}
                  />
                </div>
                <div className="input-and-label active-time">
                  <label for="recipeActiveTime">Active Time (min):</label>
                  <input
                    type="number"
                    id="recipeActiveTime"
                    name="recipeActiveTime"
                    value={this.state.recipeActiveTime}
                    onChange={this.handleChange}
                  />
                </div>

                <div className="input-and-label total-time">
                  <label for="recipeTotalTime">Total Time (min):</label>
                  <input
                    type="number"
                    id="recipeTotalTime"
                    name="recipeTotalTime"
                    value={this.state.recipeTotalTime}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input-and-label description">
                  <label for="recipeDescription">Description:</label>
                  <textarea
                    type="text"
                    id="recipeDescription"
                    name="recipeDescription"
                    value={this.state.recipeDescription}
                    placeholder="Recipe Description...."
                    onChange={this.handleChange}
                    rows="12"
                  ></textarea>
                </div>
              </div>
            </div>
            <AddIngredients
              ingredients={this.state.ingredients}
              addIngredientList={this.handleAddIngredientList}
            />
            <AddDirections
              directions={this.state.directions}
              addDirectionList={this.handleAddDirectionsList}
            />
            <div className="add-recipe-error-message">
              {this.state.errorMessage}
            </div>
            <button
              className="add-recipe-button"
              onClick={this.handleAddRecipe}
            >
              SUBMIT RECIPE
            </button>
          </div>
        </div>
      </ReactModal>
    );
  }
}
