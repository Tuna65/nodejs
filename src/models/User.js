const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
  username: { type: String },
  password: { type: String, min: 6, max: 12 },
  email: { type: String },
  roles: { type: String },
  class: { type: String },
  dateofbirth: { type: String },
  course: { type: Number },
  khoa: { type: String },
  timeDoneAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("user", User);
