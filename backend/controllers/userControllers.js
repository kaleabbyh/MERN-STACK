const user = require("../models/userModel");
const asyncHandler = require("express-async-handler");

//getting items using get controller
const getUsers = asyncHandler(async (req, res) => {
  const users = await user.find();
  res.json(users);
});

//getting a user
const getUser = asyncHandler(async (req, res) => {
  const users = await user.findById(req.params.id);
  res.json(users);
});

//posting items using post controller
const postUsers = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    res.status(400);
    throw new error("please add the required fields");
  }
  const newUser = await user.create({
    name,
    email,
  });

  res.json(newUser);
});
//updating a user
const updateUser = asyncHandler(async (req, res) => {
  const update = await user.findById(req.params.id);
  if (!update) {
    res.status(400);
    throw new error(`no user is registered by this Id=${req.params.id}`);
  }

  const updated = await user.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updated);
});

//named exports
module.exports = { getUsers, postUsers, getUser, updateUser };
