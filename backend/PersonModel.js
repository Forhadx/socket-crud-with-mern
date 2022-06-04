const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Person = new Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("person", Person);
