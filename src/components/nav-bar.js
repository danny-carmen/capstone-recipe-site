import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <div className="nav-bar">
          <NavLink exact to="/explore">
            Explore
          </NavLink>

          <div>Logo</div>
          <div className="nav-bar__icon">
            <NavLink exact to="/search">
              Search
            </NavLink>
            <NavLink exact to="/account">
              Profile
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}
