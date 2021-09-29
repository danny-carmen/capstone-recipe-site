const mongoose = require("mongoose");

require("dotenv").config();

const conn = process.env.ATLAS_URI;

const connection = mongoose.createConnection(conn, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  hash: String,
  salt: String,
  email: String,
});

const User = connection.model("User", UserSchema);

module.exports = connection;
