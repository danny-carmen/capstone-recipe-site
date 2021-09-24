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
import axios from "axios";
import S3 from "aws-s3";

import * as GB from "../../globalvariables";

import filepickerCss from "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import dropzoneCss from "../../../node_modules/dropzone/dist/min/dropzone.min.css";

const config = {
  bucketName: GB.S3B,
  region: GB.R,
  accessKeyId: GB.AK,
  secretAccessKey: GB.SAK,
};

const S3Client = new S3(config);

const handleUpload = async (file, newFileName) => {
  debugger;
  S3Client.uploadFile(file, newFileName)
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
};

export default class AddRecipeModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipeTitle: props.recipe.title || "",
      recipeDescription: props.recipe.description || "",
      recipeServings: props.recipe.servings || "",
      recipeActiveTime: props.recipe.activeTime || "",
      recipeTotalTime: props.recipe.totalTime || "",
      ingredients: props.recipe.ingredients || [],
      directions: props.recipe.directions || [],
      errorMessage: "",
      recipeImage: props.recipe.image || "",
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
      addedfile: (file) => {
        this.setState({ recipeImage: file });
      },
    };
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      errorMessage: "",
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
      recipeVersion: "0.3.0",
      recipeImage: "",
      recipeTitle: this.state.recipeTitle,
      recipeAuthor: "dcarmen",
      recipeDescription: this.state.recipeDescription,
      recipeServings: this.state.recipeServings,
      recipeActiveTime: this.state.recipeActiveTime,
      recipeTotalTime: this.state.recipeTotalTime,
      recipeIngredients: this.state.ingredients,
      recipeDirections: this.state.directions,
    };

    axios
      .post("http://localhost:5000/recipes/add", recipeObject)
      .then((res1) => {
        debugger;
        let documentId = res1.data;
        handleUpload(this.state.recipeImage, documentId);

        axios
          .post("http://localhost:5000/recipes/update/" + documentId, {
            recipeImage:
              "https://tastable-recipe-images.s3.us-west-2.amazonaws.com/" +
              documentId +
              ".jpeg",
          })
          .then(
            this.setState({
              recipeTitle: "",
              recipeDescription: "",
              recipeServings: "",
              recipeActiveTime: "",
              recipeTotalTime: "",
              ingredients: [],
              directions: [],
              errorMessage: "",
              recipeImage: "",
            })
          )
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log("Error: " + err));

    this.props.handleModalClose();
  }

  render() {
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

            {/* Something similar to this for showing current Image */}

            {/* <div className="image-uploaders">
          {this.state.thumb_image_url && this.state.editMode ? (
            <div className="portfolio-manager-image-wrapper">
              <img src={this.state.thumb_image_url} />

              <div className="image-removal-link">
                <a onClick={() => this.deleteImage("thumb_image")}>
                  Remove file
                </a>
              </div>
            </div>
          ) : (
            <DropzoneComponent
              ref={this.thumbRef}
              config={this.componentConfig()}
              djsConfig={this.djsConfig()}
              eventHandlers={this.handleThumbDrop()}
            >
              <div className="dz-message">Thumbnail</div>
            </DropzoneComponent>
          )} */}

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
                    autoComplete="off"
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
                    autoComplete="off"
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
                    autoComplete="off"
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
                    autoComplete="off"
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
                    autoComplete="off"
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
