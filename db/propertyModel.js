const mongoose = require("mongoose");

const PropSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: [true, "Please provide an owner"],
    unique: false,
  },

  street_address: {
    type: String,
    required: [true, "Please provide a street address"],
    unique: [true, "Street address exist"],
  },

  city: {
    type: String,
    required: [true, "Please provide a city"],
    unique: false,
  },

  state: {
    type: String,
    required: [true, "Please provide the state"],
    unique: false,
  },

  zip_code: {
    type: String,
    required: [true, "Please provide the zip code"],
    unique: false,
  }
});

module.exports = mongoose.model("Properties", PropSchema);