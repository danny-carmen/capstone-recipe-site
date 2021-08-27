import React from "react";

const RecipeIngredients = () => {
  return <div className="recipe-ingredients">{separatedIngredients}</div>;
};

const separatedIngredients = props.ingredients.map((ingredient) => {
  return (
    <div className="recipe-ingredient">
      {ingredient.quantity} {ingredient.item}
    </div>
  );
});
export default RecipeIngredients;
