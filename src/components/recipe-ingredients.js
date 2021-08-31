import React from "react";

const RecipeIngredients = (props) => {
  const separatedIngredients = props.ingredients.map((ingredient) => {
    return (
      <div className="recipe-ingredient">
        {ingredient.quantity} {ingredient.ingredient}
      </div>
    );
  });

  return <div className="recipe-ingredients">{separatedIngredients}</div>;
};

export default RecipeIngredients;
