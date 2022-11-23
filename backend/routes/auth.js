const router = require("express").Router();
const passport = require("passport");
const passwordUtils = require("../lib/passwordUtils");

const connection = require("../config/database");
const User = connection.models.User;

const bodyParser = require("body-parser");

var jsonParser = bodyParser.json();

router.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      throw err;
    }

    if (!user) {
      res.json({ validCredentials: false });
    } else {
      req.logIn(user, function (error, data) {
        if (error) {
          return res.status(500).json({
            message: error || "Server error",
            error: error.message || "Server error",
          });
        }
      });
      user.isAuthenticated = true;
      console.log("Headers");
      console.log(res);
      return res.json({ validCredentials: true });
    }
  })(req, res, next);
});

router.get("/checkLoginStatus", jsonParser, (req, res, next) => {
  console.log("Check Login Status");
  console.log(req.user);
  if (req.user) {
    res.json({ isValidUser: "LOGGED_IN" });
  } else {
    res.json({ isValidUser: "NOT_LOGGED_IN" });
  }
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

router.post("/register", jsonParser, (req, res, err) => {
  console.log(res.getHeader("Access-Control-Allow-Origin"));
  if (req.body.password !== "") {
    User.findOne({ username: req.body.username })
      .then((foundUser) => {
        if (foundUser) {
          res.json({ isUserUnique: false });
        } else {
          const saltHash = passwordUtils.genPassword(req.body.password);

          const salt = saltHash.salt;
          const hash = saltHash.hash;

          const newUser = new User({
            username: req.body.username,
            hash: hash,
            salt: salt,
            email: req.body.email,
          });

          newUser
            .save()
            .then((user) => {})
            .catch((err) => console.log(err));

          res.json({ isUserUnique: true });
        }
      })
      .catch((err) => {
        throw err;
      });
  }
});

module.exports = router;
