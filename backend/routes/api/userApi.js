const express = require("express");
const router = express.Router();
const {
  getUsers,
  postUsers,
  getUser,
  updateUser,
} = require("../../controllers/userControllers");

router.get("/", getUsers).post("/", postUsers);
router.get("/:id", getUser);
router.post("/:id", updateUser);
module.exports = router;
