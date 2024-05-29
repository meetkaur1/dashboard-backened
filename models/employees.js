const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  img: {
    data: Buffer,
    type: String,
  },
});
const UserModel = mongoose.model("employees", userSchema);

module.exports = UserModel;
