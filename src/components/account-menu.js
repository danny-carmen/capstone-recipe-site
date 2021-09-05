import React, { Component } from "react";
import AddRecipeModal from "./add-recipe-modal";
import LoginModal from "./login-modal";
import RegisterModal from "./register-modal";

export default class AccountMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginModalIsOpen: false,
      registerModalIsOpen: false,
      addRecipeModalIsOpen: false,
    };

    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLoginModalClose = this.handleLoginModalClose.bind(this);
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
    this.handleRegisterModalClose = this.handleRegisterModalClose.bind(this);
    this.handleAddRecipeClick = this.handleAddRecipeClick.bind(this);
    this.handleAddRecipeModalClose = this.handleAddRecipeModalClose.bind(this);
  }

  handleLoginModalClose() {
    this.setState({ loginModalIsOpen: false });
  }

  handleLoginClick() {
    this.setState({ loginModalIsOpen: true });
  }

  handleRegisterModalClose() {
    this.setState({ registerModalIsOpen: false });
  }

  handleRegisterClick() {
    this.setState({ registerModalIsOpen: true });
  }

  handleAddRecipeModalClose() {
    this.setState({ addRecipeModalIsOpen: false });
  }

  handleAddRecipeClick() {
    this.setState({ addRecipeModalIsOpen: true });
  }

  render() {
    if (this.props.loggedInStatus === "LOGGED_IN") {
      return (
        <div>
          <AddRecipeModal
            handleModalClose={this.handleAddRecipeModalClose}
            modalIsOpen={this.state.addRecipeModalIsOpen}
          />
          <div id="account-menu" className="account-menu account-menu__closed">
            <button>Profile</button>
            <button onClick={this.handleAddRecipeClick}>Add Recipe</button>
            <button>Log Out</button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <LoginModal
            handleModalClose={this.handleLoginModalClose}
            modalIsOpen={this.state.loginModalIsOpen}
          />
          <RegisterModal
            handleModalClose={this.handleRegisterModalClose}
            modalIsOpen={this.state.registerModalIsOpen}
          />

          <div id="account-menu" className="account-menu account-menu__closed">
            <button onClick={this.handleLoginClick}>Log In</button>
            <button onClick={this.handleRegisterClick}>Register</button>
          </div>
        </div>
      );
    }
  }
}
