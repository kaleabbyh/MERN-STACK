const note = require("../models/noteModel");
const asyncHandler = require("express-async-handler");

const getNotes = (req, res) => {
  note.find().then((notes) => res.json(notes));
};

const getNote = (req, res) => {
  note.findById(req.params.id).then((note) => res.json(note));
};

const postNotes = (req, res) => {
  const newNote = new note({
    text: req.body.text,
  });

  newNote
    .save()
    .then((note) => res.json(note))
    .catch((err) => res.status(404).json("erorr" + err));
};

const updateNote = asyncHandler(async (req, res) => {
  const update = await note.findById(req.params.id);
  if (!update) {
    res.status(400);
    throw new error(`no user is registered by this Id=${req.params.id}`);
  }

  const updated = await note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updated);
});

module.exports = { getNotes, postNotes, getNote, updateNote };
