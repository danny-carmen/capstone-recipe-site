import React from "react";

const RecipeIngredients = (props) => {
  const separatedIngredients = props.ingredients.map((ingredient) => {
    return (
      <div className="recipe-ingredients__ingredient">
        {ingredient.quantity} {ingredient.unit} {ingredient.ingredient}
      </div>
    );
  });

  return (
    <div className="recipe-ingredients-wrapper">
      <div className="recipe-ingredients__title">INGREDIENTS</div>
      <div className="recipe-ingredients">{separatedIngredients}</div>
    </div>
  );
};

export default RecipeIngredients;
