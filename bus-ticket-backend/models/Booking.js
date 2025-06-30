const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // ✅ Store Firebase UID as a string
    busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
    seatsBooked: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["Booked", "Cancelled"], default: "Booked" }, // ✅ Added status field
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
