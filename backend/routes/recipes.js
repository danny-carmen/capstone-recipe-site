const router = require("express").Router();
const { countDocuments } = require("../models/recipe.model");
let Recipe = require("../models/recipe.model");

router.route("/").get((req, res) => {
  console.log("Is this running?");
  Recipe.countDocuments({}, function (err, count) {
    Recipe.find()
      .sort({ updatedAt: -1 })
      .select(
        "recipeTitle recipeAuthor recipeImage recipeServings recipeActiveTime recipeTotalTime"
      )
      .limit(12)
      .skip(12 * req.query.setNumber)

      .then((recipes) => {
        res.json({ recipeArray: recipes, totalRecipeCount: count });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  });
});

router.route("/search=:criteria").get((req, res) => {
  Recipe.countDocuments(
    {
      $or: [
        { recipeTitle: { $regex: req.params.criteria, $options: "i" } },
        { recipeDescription: { $regex: req.params.criteria, $options: "i" } },
        {
          "recipeIngredients.ingredient": {
            $regex: req.params.criteria,
            $options: "i",
          },
        },
      ],
    },
    function (err, count) {
      Recipe.find({
        $or: [
          { recipeTitle: { $regex: req.params.criteria, $options: "i" } },
          { recipeDescription: { $regex: req.params.criteria, $options: "i" } },
          {
            "recipeIngredients.ingredient": {
              $regex: req.params.criteria,
              $options: "i",
            },
          },
        ],
      })
        .sort({ updatedAt: -1 })
        .select(
          "recipeTitle recipeAuthor recipeImage recipeServings recipeActiveTime recipeTotalTime"
        )
        .limit(12)
        .skip(12 * req.query.setNumber)
        .then((recipes) => {
          res.json({ recipeArray: recipes, totalRecipeCount: count });
        })
        .catch((err) => res.status(400).json("Error: " + err));
    }
  );
});

router.route("/user/:username").get((req, res) => {
  Recipe.find({ recipeAuthor: req.params.username })
    .then((recipes) => {
      res.json(recipes);
    })
    .catch((err) => console.log(err));
});

router.route("/info").get((req, res) => {
  return res.json({
    config: {
      bucketName: process.env.S3B,
      region: process.env.R,
      accessKeyId: process.env.AK,
      secretAccessKey: process.env.SAK,
    },
  });
});

router.route("/retrieve/:id").get((req, res) => {
  Recipe.findById(req.params.id)
    .then((recipe) => res.json(recipe))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then((res) => res.json(res))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const recipeVersion = req.body.recipeVersion;
  const recipeTitle = req.body.recipeTitle;
  const recipeImage = "TBD";
  const recipeAuthor = req.body.recipeAuthor;
  const recipeServings = req.body.recipeServings;
  const recipeActiveTime = req.body.recipeActiveTime;
  const recipeTotalTime = req.body.recipeTotalTime;
  const recipeIngredients = req.body.recipeIngredients;
  const recipeDirections = req.body.recipeDirections;
  const recipeDescription = req.body.recipeDescription;

  const newRecipe = new Recipe({
    recipeVersion,
    recipeTitle,
    recipeAuthor,
    recipeImage,
    recipeDescription,
    recipeServings,
    recipeActiveTime,
    recipeTotalTime,
    recipeIngredients,
    recipeDirections,
  });

  newRecipe
    .save()
    .then(() => {
      res.json({
        id: newRecipe._id,
        config: {
          bucketName: process.env.S3B,
          region: process.env.R,
          accessKeyId: process.env.AK,
          secretAccessKey: process.env.SAK,
        },
      });
    })
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
});

router.route("/update/:id").post((req, res) => {
  Recipe.findById(req.params.id)
    .then((recipe) => {
      recipe.recipeVersion = req.body.recipeVersion || recipe.recipeVersion;
      recipe.recipeTitle = req.body.recipeTitle || recipe.recipeTitle;
      recipe.recipeAuthor = req.body.recipeAuthor || recipe.recipeAuthor;
      recipe.recipeImage = req.body.recipeImage || recipe.recipeImage;
      recipe.recipeServings = req.body.recipeServings || recipe.recipeServings;
      recipe.recipeDescription =
        req.body.recipeDescription || recipe.recipeDescription;
      recipe.recipeActiveTime =
        req.body.recipeActiveTime || recipe.recipeActiveTime;
      recipe.recipeTotalTime =
        req.body.recipeTotalTime || recipe.recipeTotalTime;
      recipe.recipeIngredients =
        req.body.recipeIngredients || recipe.recipeIngredients;
      recipe.recipeDirections =
        req.body.recipeDirections || recipe.recipeDirections;

      recipe
        .save()
        .then(() => {
          res.json("Recipe Updated");
        })
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
