const express = require("express");
const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const Bus = require("../models/Bus");

const router = express.Router();

// ✅ Fetch all active (non-cancelled) tickets for a user
router.get("/tickets/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const tickets = await Booking.find({ userId, status: "Booked" }).populate(
      "busId"
    );
    if (!tickets.length) {
      return res
        .status(404)
        .json({ error: "No active tickets found for this user." });
    }

    res.json(tickets);
  } catch (error) {
    console.error("❌ Error fetching tickets:", error);
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
});

// ✅ Book a Bus Ticket
router.post("/book", async (req, res) => {
  console.log("📥 Booking Request Received:", req.body);

  try {
    const { userId, busId, seatsBooked } = req.body;

    if (
      !userId ||
      !busId ||
      !seatsBooked ||
      isNaN(seatsBooked) ||
      seatsBooked <= 0
    ) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    // Validate Bus ID
    if (!mongoose.Types.ObjectId.isValid(busId)) {
      return res.status(400).json({ error: "Invalid bus ID format" });
    }

    // Fetch Bus
    const bus = await Bus.findById(busId);
    if (!bus) {
      console.error("❌ Bus Not Found:", busId);
      return res.status(404).json({ error: "Bus not found" });
    }

    // Check Seat Availability
    if (bus.availableSeats < seatsBooked) {
      return res.status(400).json({
        error: `Not enough seats available. Only ${bus.availableSeats} left.`,
      });
    }

    // Create Booking
    const totalPrice = bus.price * seatsBooked;
    const booking = new Booking({ userId, busId, seatsBooked, totalPrice });
    await booking.save();

    // Update Available Seats
    bus.availableSeats -= seatsBooked;
    await bus.save();

    console.log("✅ Booking Successful:", booking);
    return res.status(201).json({ message: "Booking successful!", booking });
  } catch (error) {
    console.error("❌ Booking Error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// ✅ Cancel a Ticket
router.put("/cancel/:bookingId", async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Validate Booking ID
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ error: "Invalid booking ID format" });
    }

    // Find the Booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Check if it's already cancelled
    if (booking.status === "Cancelled") {
      return res.status(400).json({ error: "Booking is already cancelled." });
    }

    // Find the Bus to restore seats
    const bus = await Bus.findById(booking.busId);
    if (!bus) {
      return res.status(404).json({ error: "Associated bus not found." });
    }

    // Update Booking Status
    booking.status = "Cancelled";
    await booking.save();

    // Restore Available Seats
    bus.availableSeats += booking.seatsBooked;
    await bus.save();

    console.log("🚫 Booking Cancelled:", booking);
    return res.json({ message: "Booking cancelled successfully!", booking });
  } catch (error) {
    console.error("❌ Cancellation Error:", error);
    return res.status(500).json({ error: "Failed to cancel the booking." });
  }
});

module.exports = router;
