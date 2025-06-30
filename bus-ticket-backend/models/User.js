const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firebaseId: { type: String, required: true, unique: true }, // Store Firebase UID
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
