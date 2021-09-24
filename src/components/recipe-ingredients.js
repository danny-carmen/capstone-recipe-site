import React from "react";

const RecipeIngredients = (props) => {
  debugger;
  const separatedIngredients = props.ingredients.map((ingredient) => {
    return (
      <div className="recipe-ingredient">
        {ingredient.quantity} {ingredient.unit} {ingredient.ingredient}
      </div>
    );
  });

  return <div className="recipe-ingredients">{separatedIngredients}</div>;
};

export default RecipeIngredients;
