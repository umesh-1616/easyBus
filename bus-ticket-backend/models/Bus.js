const mongoose = require("mongoose");

const BusSchema = new mongoose.Schema({
  name: String,
  source: String,
  destination: String,
  departureTime: String,
  arrivalTime: String,
  price: Number,
  availableSeats: Number,
});

module.exports = mongoose.model("Bus", BusSchema);
