import HomePage from "./pages/home-page";
import NavBar from "./components/nav-bar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AccountMenu from "./components/account-menu";
import RecipePage from "./pages/recipe-page";
import Profile from "./pages/profile";
import React, { Component } from "react";
import axios from "axios";
import NoMatch from "./pages/nomatch";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      accountMenuOpen: false,
    };

    this.checkLoginStatus = this.checkLoginStatus.bind(this);
    this.toggleAccountMenu = this.toggleAccountMenu.bind(this);
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    axios
      .get("https://tastable-capstone.onrender.com/auth/checkLoginStatus", {
        withCredentials: true,
        credentials: "include",
      })
      .then((res) => {
        console.log("From check Login status", res);
        if (this.state.loggedInStatus !== res.data.isValidUser)
          this.setState({
            loggedInStatus: res.data.isValidUser,
          });
      })
      .catch((err) => console.log(err));
  }

  toggleAccountMenu(close) {
    if (close) {
      this.setState({ accountMenuOpen: false });
      return;
    }
    this.setState({ accountMenuOpen: !this.state.accountMenuOpen });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <NavBar
            className="relative"
            toggleAccountMenu={this.toggleAccountMenu}
          />

          <Switch>
            <Route exact path="/" component={HomePage} />

            <Route
              path="/recipes/:id"
              render={(props) => <RecipePage {...props} />}
            />

            {this.state.loggedInStatus === "LOGGED_IN" ? (
              <Route path="/my-recipes" component={Profile} />
            ) : null}

            <Route component={NoMatch} />
          </Switch>
          <AccountMenu
            loggedInStatus={this.state.loggedInStatus}
            checkLoginStatus={this.checkLoginStatus}
            accountMenuOpen={this.state.accountMenuOpen}
            closeAccountMenu={this.toggleAccountMenu}
          />
        </Router>
      </div>
    );
  }
}
