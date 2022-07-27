const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/dayone";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri);
    console.log(`DB connected succssfully`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
