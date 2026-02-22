const mongoose = require("mongoose");
const { StringSchema } = require("yup");

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      min: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
  },
  {
    timestamps: true,
  },
);

const user = mongoose.model("User", UserSchema);
module.exports = user;
