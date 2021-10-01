import React, { Component } from "react";
import ReactModal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import AddIngredients from "./add-ingredients";
import AddDirections from "./add-directions";
import { DropzoneComponent } from "react-dropzone-component";
import axios from "axios";
import S3 from "aws-s3";

import filepickerCss from "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import dropzoneCss from "../../../node_modules/dropzone/dist/min/dropzone.min.css";

const handleUpload = async (file, newFileName, config) => {
  console.log("uplaoding image");
  let S3Client = new S3(config);
  S3Client.uploadFile(file, newFileName)
    .then((data) => {})
    .catch((err) => console.error(err));
};

export default class AddRecipeModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipeTitle: props.recipe.recipeTitle || "",
      recipeAuthor: props.recipe.recipeAuthor || "",
      recipeDescription: props.recipe.recipeDescription || "",
      recipeServings: props.recipe.recipeServings || "",
      recipeActiveTime: props.recipe.recipeActiveTime || "",
      recipeTotalTime: props.recipe.recipeTotalTime || "",
      ingredients: props.recipe.recipeIngredients || [],
      directions: props.recipe.recipeDirections || [],
      errorMessage: "",
      recipeImage: props.recipe.recipeImage || "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAddIngredientList = this.handleAddIngredientList.bind(this);
    this.handleAddDirectionsList = this.handleAddDirectionsList.bind(this);
    this.handleSubmitRecipe = this.handleSubmitRecipe.bind(this);
    this.djsConfig = this.djsConfig.bind(this);
    this.handleImageDrop = this.handleImageDrop.bind(this);
    this.componentConfig = this.componentConfig.bind(this);
    this.recipeImageRef = React.createRef();
    this.submitNewRecipe = this.submitNewRecipe.bind(this);
    this.submitEditedRecipe = this.submitEditedRecipe.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.updateDatabase = this.updateDatabase.bind(this);
    this.reloadRecipesAndCloseModal =
      this.reloadRecipesAndCloseModal.bind(this);
  }

  componentConfig() {
    return {
      iconFiletypes: [".jpg"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post",
    };
  }

  djsConfig() {
    return {
      addRemoveLinks: true,
      maxFiles: 1,
      acceptedFiles: ".jpg, .jpeg",
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
      errorMessage: "",
    });
  }

  handleAddDirectionsList(directionList) {
    this.setState({
      directions: directionList,
      errorMessage: "",
    });
  }

  componentDidMount() {
    axios
      .get("https://ddc-tastable.herokuapp.com/auth/getUserName", {
        withCredentials: true,
      })
      .then((res) => {
        this.setState({ recipeAuthor: res.data });
      })
      .catch((err) => console.log(err));
  }

  areAnyRequiredFieldsEmpty() {
    if (!this.state.recipeTitle) {
      this.setState({
        errorMessage: "Please provide a title for this recipe.",
      });
      return true;
    }
    if (!this.state.recipeDescription) {
      this.setState({
        errorMessage: "Please provide a description for this recipe.",
      });
      return true;
    }
    if (!this.state.recipeActiveTime) {
      this.setState({
        errorMessage: "Please provide an active time for this recipe.",
      });
      return true;
    }

    if (!this.state.recipeTotalTime) {
      this.setState({
        errorMessage: "Please provide a total time for this recipe.",
      });
      return true;
    }

    if (this.state.ingredients.length < 1) {
      this.setState({
        errorMessage: "Please provide at least one ingredient for this recipe.",
      });
      return true;
    }

    if (this.state.directions.length < 1) {
      this.setState({
        errorMessage: "Please provide at least one direction for this recipe.",
      });
      return true;
    }

    if (!this.state.recipeImage) {
      this.setState({
        errorMessage: "Please provide an image for this recipe.",
      });
      return true;
    }
  }

  submitNewRecipe(recipeObject) {
    axios
      .post("https://ddc-tastable.herokuapp.com/recipes/add", recipeObject)
      .then((res1) => {
        let documentId = res1.data.id;
        handleUpload(this.state.recipeImage, documentId, res1.data.config);

        axios
          .post(
            "https://ddc-tastable.herokuapp.com/recipes/update/" + documentId,
            {
              recipeImage:
                "https://tastable-recipe-images.s3.us-west-2.amazonaws.com/" +
                documentId +
                ".jpeg",
            }
          )
          .then(() => {
            console.log("got to 179");
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
            });

            this.reloadRecipesAndCloseModal();
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log("Error: " + err));
  }

  submitEditedRecipe(recipeObject) {
    axios
      .get("https://ddc-tastable.herokuapp.com/recipes/info")
      .then((res) => {
        let S3Client = new S3(res.data.config);
        if (this.props.recipe.recipeImage !== this.state.recipeImage) {
          S3Client.deleteFile(this.props.recipe._id + ".jpeg")
            .then((data) => {
              S3Client.uploadFile(this.state.recipeImage, this.props.recipe._id)
                .then((data) => {
                  this.updateDatabase(recipeObject);
                })
                .catch((err) => console.error(err));
            })
            .catch((err) => console.error(err));
        } else {
          this.updateDatabase(recipeObject);
        }
      })
      .catch((err) => console.log(err));
  }

  updateDatabase(recipeObject) {
    axios
      .post(
        "https://ddc-tastable.herokuapp.com/recipes/update/" +
          this.props.recipe._id,
        recipeObject
      )
      .then((res) => {
        this.reloadRecipesAndCloseModal();
      })
      .catch((err) => console.log(err));
  }

  handleSubmitRecipe() {
    if (this.areAnyRequiredFieldsEmpty()) {
      return;
    }

    const recipeObject = {
      recipeVersion: "0.3.0",
      recipeImage: "",
      recipeTitle: this.state.recipeTitle,
      recipeAuthor: this.state.recipeAuthor,
      recipeDescription: this.state.recipeDescription,
      recipeServings: this.state.recipeServings,
      recipeActiveTime: this.state.recipeActiveTime,
      recipeTotalTime: this.state.recipeTotalTime,
      recipeIngredients: this.state.ingredients,
      recipeDirections: this.state.directions,
    };

    if (this.props.mode === "newRecipe") {
      this.submitNewRecipe(recipeObject);
    } else {
      recipeObject.recipeImage = this.props.recipe.recipeImage;
      this.submitEditedRecipe(recipeObject);
    }
  }

  reloadRecipesAndCloseModal() {
    if (this.props.reloadRecipes) {
      this.props.reloadRecipes();
    }
    this.props.handleModalClose();
  }

  removeImage() {
    this.setState({
      recipeImage: null,
    });
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
              <button onClick={this.props.handleModalClose}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <div className="image-uploader">
              {this.props.mode === "editRecipe" &&
              typeof this.state.recipeImage === "string" ? (
                <div className="current-image-wrapper">
                  <img
                    src={this.state.recipeImage}
                    alt={this.state.recipeTitle}
                  />

                  <div className="image-removal-link">
                    <a href="#" onClick={() => this.removeImage()}>
                      Remove file
                    </a>
                  </div>
                </div>
              ) : (
                <DropzoneComponent
                  ref={this.recipeImageRef}
                  config={this.componentConfig()}
                  eventHandlers={this.handleImageDrop()}
                  djsConfig={this.djsConfig()}
                ></DropzoneComponent>
              )}
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
            {this.props.mode === "newRecipe" ? (
              <button
                className="add-recipe-button"
                onClick={this.handleSubmitRecipe}
              >
                SUBMIT RECIPE
              </button>
            ) : (
              <button
                className="add-recipe-button"
                onClick={this.handleSubmitRecipe}
              >
                EDIT RECIPE
              </button>
            )}
          </div>
        </div>
      </ReactModal>
    );
  }
}
