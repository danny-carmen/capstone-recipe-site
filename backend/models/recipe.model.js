const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Ingredient = new Schema({
  idx: { type: Number },
  quantity: { type: String, required: true },
  unit: { type: String },
  ingredient: { type: String, required: true },
});

const Direction = new Schema({
  idx: { type: Number, required: true },
  direction: { type: String, required: true },
});

const recipeSchema = new Schema(
  {
    recipeVersion: {
      type: String,
      required: true,
    },
    recipeTitle: {
      type: String,
      required: true,
    },
    recipeAuthor: {
      type: String,
      required: true,
    },
    recipeImage: {
      type: String,
      required: true,
    },
    recipeDescription: {
      type: String,
      required: true,
    },
    recipeServings: {
      type: Number,
      required: true,
    },
    recipeActiveTime: {
      type: Number,
      required: true,
    },
    recipeTotalTime: {
      type: Number,
      required: true,
    },
    recipeIngredients: {
      type: [Ingredient],
      required: true,
    },
    recipeDirections: {
      type: [Direction],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
