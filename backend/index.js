//Importing modules
const express = require("express");
const users = require("./routes/api/userApi");
const notes = require("./routes/api/noteApi");
const connectDB = require("./config/db");
var cors = require("cors");

connectDB();

var app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", users);
app.use("/api/notes", notes);

PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`running on  Port ${PORT}`));
