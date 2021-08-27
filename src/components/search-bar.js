import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice, faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";

export default class SearchBar extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="search-bar-wrapper search-bar-wrapper__collapsed">
        <input type="text" className="search-bar" placeholder="Search" />
        <FontAwesomeIcon className="search-bar-icon" icon={faSearch} />
        <FontAwesomeIcon
          className="search-bar-icon"
          icon={faFilter}
          onClick=""
        />
        <FontAwesomeIcon className="search-bar-icon" icon={faDice} />
      </div>
    );
  }
}
