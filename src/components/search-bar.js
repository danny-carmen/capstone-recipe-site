import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice, faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";
import FilterFields from "./filter-fields";

export default class SearchBar extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="search-bar-wrapper">
        <div className="search-bar-and-icons">
          <input type="text" className="search-bar" placeholder="Search" />
          <button className="search-bar-icon">
            <FontAwesomeIcon icon={faSearch} />
          </button>

          <button className="search-bar-icon">
            <FontAwesomeIcon icon={faDice} />
          </button>
        </div>
        <FilterFields />
      </div>
    );
  }
}
