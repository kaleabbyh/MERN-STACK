const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const user = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const userExists = await user.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // Create user
  const newUser = await user.create({
    username,
    email,
    password: hashedPassword,
  });
  if (newUser) {
    res.status(201).json({
      _id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      token: generateToken(newUser._id),
    });

    alert("user is successfully registered");
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const loginuser = await user.findOne({ email });

  if (loginuser && (await bcrypt.compare(password, loginuser.password))) {
    res.json({
      _id: loginuser.id,
      username: loginuser.username,
      email: loginuser.email,
      token: generateToken(loginuser._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, "kaleab123", {
    expiresIn: "30d",
  });
};

//
//
//
//
//
//
//getting items using get controller
const getUsers = asyncHandler(async (req, res) => {
  const users = await user.find();
  res.json(users);
});

// //getting a user
// const getUser = asyncHandler(async (req, res) => {
//   const users = await user.findById(req.params.id);
//   res.json(users);
// });

// //posting items using post controller
// const postUsers = asyncHandler(async (req, res) => {
//   const { name, email } = req.body;
//   if (!name || !email) {
//     res.status(400);
//     throw new error("please add the required fields");
//   }
//   const newUser = await user.create({
//     name,
//     email,
//   });

//   res.json(newUser);
// });
// //updating a user
// const updateUser = asyncHandler(async (req, res) => {
//   const update = await user.findById(req.params.id);
//   if (!update) {
//     res.status(400);
//     throw new error(`no user is registered by this Id=${req.params.id}`);
//   }

//   const updated = await user.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });

//   res.json(updated);
// });

//named exports
module.exports = {
  getUsers,
  // postUsers,
  // getUser,
  // updateUser,
  registerUser,
  loginUser,
  getMe,
};
