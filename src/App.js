import HomePage from "./components/home-page";
import NavBar from "./components/nav-bar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AccountMenu from "./components/account-menu";
import RecipePage from "./components/recipe-page";
import Profile from "./components/profile";
import React, { Component } from "react";
import axios from "axios";
//TODO need a nomatch
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
      .get("http://localhost:5000/auth/checkLoginStatus", {
        withCredentials: true,
      })
      .then((res) => {
        if (this.state.loggedInStatus !== res.data.isValidUser)
          this.setState({
            loggedInStatus: res.data.isValidUser,
          });
      })
      .catch((err) => console.log(err));
  }

  toggleAccountMenu() {
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
              <Route path="/profile" component={Profile} />
            ) : null}
          </Switch>
          <AccountMenu
            loggedInStatus={this.state.loggedInStatus}
            checkLoginStatus={this.checkLoginStatus}
            accountMenuOpen={this.state.accountMenuOpen}
          />
        </Router>
      </div>
    );
  }
}
