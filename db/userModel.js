const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: [true, "Username exist"],
  },

  password: {
    type: String,
    required: [true, "Please provide a password"],
    unique: false,
  },

  fname: {
    type: String,
    required: [true, "Please provide the first name"],
    unique: false,
  },

  lname: {
    type: String,
    required: [true, "Please provide the last name"],
    unique: false,
  },
});

module.exports = mongoose.model("Users", UserSchema);