const note = require("../models/noteModel");
const asyncHandler = require("express-async-handler");
//get notes
const getNotes = asyncHandler(async (req, res) => {
  const notes = await note.find({ user: req.user.id });
  res.json(notes);
});

// const getNote = (req, res) => {
//   note.findById(req.params.id).then((note) => res.json(note));
// };

//post notes
const postNotes = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  const newNote = await note.create({
    user: req.user.id,
    text: req.body.text,
  });

  res.status(200).json(newNote);
});
//update note
const updateNote = asyncHandler(async (req, res) => {
  const updatenotee = await note.findById(req.params.id);
  if (!updatenotee) {
    res.status(400);
    throw new error(`no note is recorded by this Id`);
  }
  if (!req.user) {
    res.status(401);
    throw new Error("no loged in user is founed");
  }
  if (updatenotee.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updated = await note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updated);
});

//delete note
const deleteNote = asyncHandler(async (req, res) => {
  const deletenotee = await note.findById(req.params.id);
  if (!deletenotee) {
    res.status(400);
    throw new error(`no user is registered by this Id=${req.params.id}`);
  }
  if (!req.user) {
    res.status(401);
    throw new Error("no loged in user is found");
  }
  if (deletenotee.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await note.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = { getNotes, postNotes, updateNote, deleteNote };
