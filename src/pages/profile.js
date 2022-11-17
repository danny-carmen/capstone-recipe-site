import React, { Component } from "react";

import MyRecipes from "../components/my-recipes";
import axios from "axios";

export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      openWindow: "my-recipes",
      userRecipes: [],
      isLoading: true,
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
    axios
      .get("https://tastable-capstone.onrender.com/auth/getUserName", {
        withCredentials: true,
      })
      .then((res) => {
        axios
          .get(
            "https://tastable-capstone.onrender.com/recipes/user/" + res.data
          )
          .then((res) => {
            this.setState({ userRecipes: res.data, isLoading: false });
          })
          .catch((err) => {
            console.log(err);
            this.setState({ isLoading: false });
          });
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div className="profile-wrapper">
        <div className="my-recipes-title">MY RECIPES</div>
        <div className="my-recipes">
          <MyRecipes
            recipes={this.state.userRecipes}
            reloadRecipes={this.getUserRecipes}
            isLoading={this.state.isLoading}
          />
        </div>
      </div>
    );
  }
}
