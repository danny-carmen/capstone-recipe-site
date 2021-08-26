import React from "react";

const RecipeTime = (props) => {
  return (
    <div className={props.className}>
      {props.type} Time: {props.time}
    </div>
  );
};

export default RecipeTime;
