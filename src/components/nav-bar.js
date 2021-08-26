import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <div className="nav-bar">
          <NavLink className="nav-bar__hamburger" exact to="/explore">
            Hamburger Menu
          </NavLink>

          <div className="nav-bar__logo">Tastable</div>

          <NavLink className="nav-bar__account" exact to="/account">
            Account
          </NavLink>
        </div>
      </div>
    );
  }
}
