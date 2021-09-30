import React, { Component } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";

export default class NavBar extends Component {
  constructor() {
    super();
    this.handleAccountClick = this.handleAccountClick.bind(this);
  }

  handleAccountClick(e) {
    this.props.toggleAccountMenu();
  }
  render() {
    return (
      <div>
        <div className="nav-bar">
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
