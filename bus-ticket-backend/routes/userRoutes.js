const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Make sure you have a User model

// Create a new user
router.post("/", async (req, res) => {
  try {
    const { firebaseId, name, email, phone } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ firebaseId });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    user = new User({ firebaseId, name, email, phone });
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

module.exports = router;
