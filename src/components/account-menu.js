import React, { Component } from "react";
import { Link } from "react-router-dom";
import AddRecipeModal from "./add-recipe/add-recipe-modal";
import LoginModal from "./login-modal";
import RegisterModal from "./register-modal";
import axios from "axios";
import { withRouter } from "react-router";

class AccountMenu extends Component {
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
    // this.checkLoginStatus = this.checkLoginStatus.bind(this);
    this.logOutUser = this.logOutUser.bind(this);
    this.logInUser = this.logInUser.bind(this);
    this.closeAccountMenu = this.closeAccountMenu.bind(this);
  }

  handleLoginModalClose() {
    this.setState({ loginModalIsOpen: false });
  }

  handleLoginClick() {
    this.setState({ loginModalIsOpen: true });
    this.closeAccountMenu(true);
  }

  handleRegisterModalClose(e) {
    this.setState({ registerModalIsOpen: false });
  }

  handleRegisterClick() {
    this.setState({ registerModalIsOpen: true });
    this.closeAccountMenu(true);
  }

  handleAddRecipeModalClose() {
    this.setState({ addRecipeModalIsOpen: false });
  }

  handleAddRecipeClick() {
    this.setState({ addRecipeModalIsOpen: true });
    this.closeAccountMenu(true);
  }

  // checkLoginStatus() {

  //   this.props.checkLoginStatus();
  // }

  logOutUser() {
    axios
      .get("http://localhost:5000/auth/logout", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        this.props.history.push("/");
        this.props.checkLoginStatus();
      })
      .catch((err) => console.log(err));
  }

  logInUser() {
    this.props.checkLoginStatus();
  }

  closeAccountMenu() {
    this.props.closeAccountMenu(true);
  }

  render() {
    if (this.props.loggedInStatus === "LOGGED_IN") {
      return (
        <div>
          <AddRecipeModal
            handleModalClose={this.handleAddRecipeModalClose}
            modalIsOpen={this.state.addRecipeModalIsOpen}
            recipe=""
            mode="newRecipe"
          />
          <div
            id="account-menu"
            className={
              this.props.accountMenuOpen
                ? "account-menu account-menu__open"
                : "account-menu account-menu__closed"
            }
          >
            <Link
              onClick={() => this.closeAccountMenu()}
              className="account-button"
              to="/profile"
            >
              Profile
            </Link>
            <button
              className="account-button"
              onClick={this.handleAddRecipeClick}
            >
              Add Recipe
            </button>
            <button
              onClick={() => {
                this.logOutUser();
                this.closeAccountMenu();
              }}
              className="account-button"
            >
              Log Out
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <LoginModal
            handleModalClose={this.handleLoginModalClose}
            logInUser={this.logInUser}
            modalIsOpen={this.state.loginModalIsOpen}
          />
          <RegisterModal
            handleModalClose={this.handleRegisterModalClose}
            modalIsOpen={this.state.registerModalIsOpen}
            openLogin={this.handleLoginClick}
          />

          <div
            id="account-menu"
            className={
              this.props.accountMenuOpen
                ? "account-menu account-menu__open"
                : "account-menu account-menu__closed"
            }
          >
            <button className="account-button" onClick={this.handleLoginClick}>
              Log In
            </button>
            <button
              className="account-button"
              onClick={this.handleRegisterClick}
            >
              Register
            </button>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(AccountMenu);
