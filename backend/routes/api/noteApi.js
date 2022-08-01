const express = require("express");
const router = express.Router();
const { protect } = require("../../middleware/authMiddleware");
const {
  getNotes,
  postNotes,

  deleteNote,
  updateNote,
} = require("../../controllers/noteControllers");

router.route("/").get(protect, getNotes).post(protect, postNotes);

router.route("/:id").delete(protect, deleteNote).put(protect, updateNote);
module.exports = router;
