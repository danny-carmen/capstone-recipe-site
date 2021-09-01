import React, { Component } from "react";
import RecipeCard from "./recipe-card";

export default class RecipeBoard extends Component {
  render() {
    const boardItems = this.props.data.map((boardItem) => {
      return <RecipeCard key={boardItem.id} boardItem={boardItem} />;
    });

    return (
      <div className="recipe-board-wrapper">
        <div className="spacer-search-bar"></div>
        <div className="recipe-board-grid">
          <div className="recipe-board">{boardItems}</div>
          <div className="spacer50"></div>
        </div>
      </div>
    );
  }
}
