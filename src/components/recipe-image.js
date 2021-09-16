import React, { Component } from "react";

export default class RecipeImage extends Component {
  render() {
    return (
      <div className="recipe-images">
        <img
          className="recipe-image"
          alt={this.props.imageAlt}
          src={this.props.image}
        />
      </div>
    );
  }
}
