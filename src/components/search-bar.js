import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import FilterFields from "./filter/filter-fields";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <div className="search-bar-wrapper">
        <input
          type="text"
          id="searchQuery"
          name="searchQuery"
          autoComplete="off"
          className="search-bar"
          placeholder="Search..."
          value={this.state.searchQuery}
          onChange={this.handleChange}
        />
        <div className="search-bar-icons">
          <button
            onClick={() =>
              this.props.updateBoardFromSearch(this.state.searchQuery)
            }
            className={
              this.props.isSearch
                ? "search-bar-icon search-bar-icon__selected"
                : "search-bar-icon search-bar-icon__unselected"
            }
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>

          {this.props.isSearch ? (
            <button
              onClick={() => {
                this.setState({ searchQuery: "" });
                this.props.updateBoardForAllRecipes();
              }}
              className="search-bar-icon"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}
