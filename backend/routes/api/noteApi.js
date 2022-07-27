const express = require("express");
const router = express.Router();
const {
  getNotes,
  postNotes,
  getNote,
} = require("../../controllers/noteControllers");

router.get("/", getNotes).post("/", postNotes);
router.get("/:id", getNote);
module.exports = router;
