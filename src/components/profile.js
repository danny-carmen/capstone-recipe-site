import React, { Component } from "react";
import lasagna from "../images/lasagna.jpg";
import AccountInfo from "./account-info";
import MyRecipes from "./my-recipes";
import axios from "axios";

export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      openWindow: "my-recipes",
      userRecipes: [],
    };

    this.handleMyAccountButtonClick =
      this.handleMyAccountButtonClick.bind(this);
    this.handleMyRecipesClick = this.handleMyRecipesClick.bind(this);
    this.getUserRecipes = this.getUserRecipes.bind(this);
  }
  handleMyAccountButtonClick(e) {
    if (this.state.openWindow !== "account") {
      this.setState({
        openWindow: "account",
      });
    }
  }

  handleMyRecipesClick(e) {
    if (this.state.openWindow !== "my-recipes") {
      this.setState({
        openWindow: "my-recipes",
      });
    }
  }

  componentDidMount() {
    debugger;
    this.getUserRecipes();
  }

  getUserRecipes() {
    axios
      .get("https://ddc-tastable.herokuapp.com/auth/getUserName", {
        withCredentials: true,
      })
      .then((res) => {
        axios
          .get("https://ddc-tastable.herokuapp.com/recipes/user/" + res.data)
          .then((res) => {
            console.log(res);
            this.setState({ userRecipes: res.data });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div className="profile-wrapper">
        <div className="selection-options">
          <button
            className={this.state.openWindow === "my-recipes" ? "selected" : ""}
          >
            MY RECIPES
          </button>
        </div>
        <div className="flip-window">
          <MyRecipes
            recipes={this.state.userRecipes}
            reloadRecipes={this.getUserRecipes}
          />
        </div>
      </div>
    );
  }
}
