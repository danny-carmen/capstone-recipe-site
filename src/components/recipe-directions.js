import React from "react";

const RecipeDirections = (props) => {
  const recipeDirections = props.directions.map((direction) => {
    return (
      <li className="recipe-directions__direction">{direction.direction}</li>
    );
  });
  return (
    <div className="recipe-directions">
      <div className="recipe-directions__title">DIRECTIONS</div>
      <ol>{recipeDirections}</ol>
    </div>
  );
};

export default RecipeDirections;
