const express = require("express");
const router = express.Router();
const {
  getUsers,
  // postUsers,
  // getUser,
  // updateUser,
  registerUser,
  loginUser,
} = require("../../controllers/userControllers");

router.get("/", getUsers);
// router.get("/:id", getUser);
// router.post("/:id", updateUser);

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
