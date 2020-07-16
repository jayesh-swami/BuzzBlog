const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//User Schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    lastLogout: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("Users",userSchema);