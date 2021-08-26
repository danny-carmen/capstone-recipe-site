import React, { Component } from "react";
import RecipeCard from "./recipe-card";

export default class RecipeBoard extends Component {
  componentDidMount() {
    console.log(this.props.data);
  }
  render() {
    const boardItems = this.props.data.map((boardItem) => {
      return <RecipeCard key={boardItem.id} boardItem={boardItem} />;
    });

    return <div className="recipe-board">{boardItems}</div>;
  }
}
