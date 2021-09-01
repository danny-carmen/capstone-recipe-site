import React, { Component } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";

export default class NavBar extends Component {
  constructor() {
    super();
    this.handleAccountClick = this.handleAccountClick.bind(this);
  }

  // handleExploreClick(e) {
  //   e.currentTarget.classList.toggle("nav-bar__icon-border__unselected");
  //   e.currentTarget.classList.toggle("nav-bar__icon-border__selected");

  //   document
  //     .getElementById("explore-menu")
  //     .classList.toggle("explore-menu__closed");
  //   document
  //     .getElementById("explore-menu")
  //     .classList.toggle("explore-menu__open");
  // }

  handleAccountClick(e) {
    e.currentTarget.classList.toggle("nav-bar__icon-border__unselected");
    e.currentTarget.classList.toggle("nav-bar__icon-border__selected");

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
          {/* <button
            className="nav-bar__hamburger nav-bar__icon-border nav-bar__icon-border__unselected"
            onClick={(e) => {
              this.handleExploreClick(e);
            }}
          >
            <FontAwesomeIcon className="nav-bar__icon" icon={faBars} />
          </button> */}

          <Link className="nav-bar__logo" exact to="/">
            <div>Tastable</div>
          </Link>

          <button
            className="nav-bar__account nav-bar__icon-border nav-bar__icon-border__unselected"
            onClick={(e) => {
              this.handleAccountClick(e);
            }}
          >
            <FontAwesomeIcon className="nav-bar__icon" icon={faUser} />
          </button>
        </div>
      </div>
    );
  }
}
