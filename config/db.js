const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(MONGO_URI);
    console.log("DB Connected");
  } catch (error) {
    console.log("Something went wrong while connecting DB");
  }
};

module.exports = connectDB;
