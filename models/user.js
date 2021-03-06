const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  fname: String,
  lname: String,
  username: String,
  password: String,
  profilePicture: String
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);

module.exports = User;