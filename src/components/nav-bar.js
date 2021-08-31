import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";

export default class NavBar extends Component {
  handleAccountClick() {
    document
      .getElementById("account-menu")
      .classList.toggle("account-menu__closed");
    document
      .getElementById("account-menu")
      .classList.toggle("account-menu__open");
  }
  render() {
    return (
      <div>
        <div className="nav-bar">
          <NavLink className="nav-bar__hamburger" exact to="/explore">
            <FontAwesomeIcon className="nav-bar__icon" icon={faBars} />
          </NavLink>

          <NavLink className="nav-bar__logo" exact to="/">
            <div>Tastable</div>
          </NavLink>

          <a
            onClick={this.handleAccountClick}
            className="nav-bar__account"
            exact
            to="/account"
          >
            <FontAwesomeIcon className="nav-bar__icon" icon={faUser} />
          </a>
        </div>
      </div>
    );
  }
}
