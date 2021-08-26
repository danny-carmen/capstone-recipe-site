import React, { Component } from "react";

export default class SearchBar extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="search-bar-wrapper search-bar-wrapper__collapsed">
        <input type="text" className="search-bar" placeholder="Search" />
        <button id="search-bar-button">+</button>
      </div>
    );
  }
}
