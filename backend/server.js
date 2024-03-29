const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
let passport = require("passport");
const MongoStore = require("connect-mongo");
const path = require("path");

// const MongoStore = require("connect-mongo")(session);

require("dotenv").config();
require("./config/passportConfig");

const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established.");
});

app.use(express.static(path.join(__dirname, "/../build")));

// app.use(
//   cors({
//     origin: ["https://tastable.netlify.app/", "http://localhost:3000"],
//     credentials: true,
//   })
// );
app.options(
  (req, res, next) => {
    console.log("CORS");
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://tastable.netlify.app"
    );
    next();
  },
  cors({
    origin: ["https://tastable.netlify.app/", "http://localhost:3000"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// app.use(
//   cors({
//     origin: ["https://tastable.netlify.app/", "http://localhost:3000"],
//     credentials: true,
//   })
// );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionStore = new MongoStore({
  mongoUrl: process.env.ATLAS_URI,
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    // cookie: { maxAge: 1000 * 60 * 60 * 24 },
    // cookie: { secure: true, maxAge: 1000 * 60 * 60 * 24 },
    cookie: { sameSite: "none", secure, maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const recipesRouter = require("./routes/recipes");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

// app.options("/*", (req, res, next) => {
//   console.log("OPTIONS - Method is" + req.method);
//   next();
// });

// Access-Control-Expose-Headers: Access-Control-Allow-Origin

app.use((req, res, next) => {
  console.log("Method is " + req.method);
  res.setHeader("Access-Control-Allow-Origin", "https://tastable.netlify.app");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Expose-Headers", "Set-Cookie");
  if (req.method == "OPTIONS") {
    console.log("OPTIONS");
    console.log(res.getHeader("Access-Control-Allow-Origin"));
    res.status(200).end();
  } else {
    console.log(res.getHeader("Access-Control-Allow-Origin"));
    next();
  }
});

app.use("/auth", authRouter);
app.use("/recipes", recipesRouter);
app.use("/users", usersRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../build/index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
