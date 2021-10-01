import React from "react";

const RecipeTime = (props) => {
  return (
    <div className={props.className}>
      {props.type} Time: {props.time} min.
    </div>
  );
};

export default RecipeTime;
