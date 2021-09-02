import React, { Component } from "react";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class FilterFieldIcon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: "FALSE",
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (e) => {
    this.props.handleFieldClick(e.currentTarget, "filtersActive");
  };

  render() {
    return (
      <div
        id="filters-icon"
        className="filter-field filter-field__inactive filter-field__icon"
        onClick={this.handleClick}
      >
        <FontAwesomeIcon icon={faFilter} />
      </div>
    );
  }
}
