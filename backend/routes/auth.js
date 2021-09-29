const router = require("express").Router();
const passport = require("passport");
const passwordUtils = require("../lib/passwordUtils");

const connection = require("../config/database");
const User = connection.models.User;

const bodyParser = require("body-parser");

var jsonParser = bodyParser.json();

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     failureRedirect: "/login-failure",
//     successRedirect: "login-success",
//   }),
//   (res, req, next) => {}
// );

// router.post(
//   "/login",
//   jsonParser,
//   (req, res, next) => {
//     console.log(req.body);
//     next();
//   },
//   passport.authenticate("local", { session: true }),
//   (req, res, next) => {}
// );

router.post("/login", function (req, res, next) {
  passport.authenticate("local", function (error, user, info) {
    if (error) {
      return res.status(500).json({
        message: error || "Something happend",
        error: error.message || "Server error",
      });
    }

    req.logIn(user, function (error, data) {
      if (error) {
        return res.status(500).json({
          message: error || "Something happend",
          error: error.message || "Server error",
        });
      }
    });

    user.isAuthenticated = true;

    return res.send();
  })(req, res, next);
});

router.get("/checkLoginStatus", jsonParser, (req, res, next) => {
  if (req.user) {
    res.json({ isValidUser: "LOGGED_IN" });
  } else {
    res.json({ isValidUser: "NOT_LOGGED_IN" });
  }

  // res.json({ message: "It worked", user: req.user });
});

router.get("/getUserName", jsonParser, (req, res, next) => {
  if (req.user) {
    return res.json(req.user.username);
  }
});

router.get("/logout", (req, res) => {
  req.logOut;
  res.status(200).clearCookie("connect.sid", {
    path: "/",
  });
  req.session.destroy(function (err) {});
  res.json({ status: "Logged Out" });
});

router.post("/register", jsonParser, (req, res) => {
  const saltHash = passwordUtils.genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    username: req.body.username,
    hash: hash,
    salt: salt,
    email: req.body.email,
  });

  newUser.save().then((user) => {
    console.log(user);
  });

  res.redirect("/login");
});

module.exports = router;
