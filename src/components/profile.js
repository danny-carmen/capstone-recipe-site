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
    this.getUserRecipes();
  }

  getUserRecipes() {
    debugger;
    axios
      .get("http://localhost:5000/auth/getUserName", { withCredentials: true })
      .then((res) => {
        axios
          .get("http://localhost:5000/recipes/user/" + res.data)
          .then((res) => {
            debugger;
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
            onClick={this.handleMyRecipesClick}
          >
            MY RECIPES
          </button>
          {/* <button
            className={this.state.openWindow === "account" ? "selected" : ""}
            onClick={this.handleMyAccountButtonClick}
          >
            MY ACCOUNT
          </button> */}
        </div>
        <div className="flip-window">
          <MyRecipes
            recipes={this.state.userRecipes}
            reloadRecipes={this.getUserRecipes}
          />
          {/* {this.state.openWindow === "account" ? (
            <AccountInfo />
          ) : (
            <MyRecipes recipes={userRecipes} /> */}
          {/* )} */}
        </div>
      </div>
    );
  }
}
