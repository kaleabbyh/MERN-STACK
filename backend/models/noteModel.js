const { text } = require("body-parser");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    text: {
      type: "string",
      required: true,
    },
  },
  { timestamps: true }
);

const note = mongoose.model("note", noteSchema);
module.exports = note;
