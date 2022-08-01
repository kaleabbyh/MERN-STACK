const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: "string",
    required: [true, "please fill a username"],
  },
  email: {
    type: "string",
    required: [true, "please fill an email"],
  },
  password: {
    type: "string",
    required: [true, "please fill a password"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
const user = mongoose.model("user", userSchema);
module.exports = user;
