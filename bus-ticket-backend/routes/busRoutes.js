const express = require("express");
const Bus = require("../models/Bus");
const { ObjectId } = require("mongodb");

const router = express.Router();

// ✅ Add Multiple Buses (Preventing Duplicate Entries)
router.post("/add-multiple", async (req, res) => {
  try {
    console.log("📥 Received Buses Data:", req.body);

    if (!Array.isArray(req.body) || req.body.length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid input. Expecting an array." });
    }

    const insertedBuses = await Bus.insertMany(req.body);
    res
      .status(201)
      .json({ message: "✅ Buses added successfully!", data: insertedBuses });
  } catch (error) {
    console.error("❌ Error adding multiple buses:", error);
    res
      .status(500)
      .json({ error: "Failed to add buses.", details: error.message });
  }
});

// ✅ Add a Single Bus (with Duplicate Check)
router.post("/add", async (req, res) => {
  try {
    const { name, source, destination } = req.body;

    const existingBus = await Bus.findOne({ name, source, destination });
    if (existingBus) {
      return res
        .status(400)
        .json({ error: "Bus already exists for this route." });
    }

    const newBus = new Bus(req.body);
    await newBus.save();
    res
      .status(201)
      .json({ message: "✅ Bus added successfully!", data: newBus });
  } catch (error) {
    console.error("❌ Error adding bus:", error);
    res
      .status(500)
      .json({ error: "Failed to add bus", details: error.message });
  }
});

// ✅ Search Buses by Source & Destination
router.get("/search", async (req, res) => {
  try {
    const { source, destination } = req.query;
    if (!source || !destination) {
      return res
        .status(400)
        .json({ error: "Source and destination are required." });
    }

    const buses = await Bus.find({ source, destination });

    if (buses.length === 0) {
      return res
        .status(404)
        .json({ message: "No buses found for this route." });
    }

    res.json(buses);
  } catch (error) {
    console.error("❌ Error fetching buses:", error);
    res
      .status(500)
      .json({ error: "Error fetching buses", details: error.message });
  }
});

// ✅ Get a Bus by ID
router.get("/:busId", async (req, res) => {
  try {
    let { busId } = req.params;
    console.log(`📥 Fetching bus details for ID: ${busId}`);

    if (!ObjectId.isValid(busId)) {
      console.warn("⚠️ Invalid Bus ID Format:", busId);
      return res.status(400).json({ error: "Invalid bus ID format." });
    }

    busId = new ObjectId(busId);

    const bus = await Bus.findOne({ _id: busId });

    if (!bus) {
      console.warn("⚠️ Bus Not Found:", busId);
      return res.status(404).json({ error: "Bus not found." });
    }

    console.log("✅ Bus found:", bus);
    res.json(bus);
  } catch (error) {
    console.error("❌ Error fetching bus:", error);
    res
      .status(500)
      .json({ error: "Error fetching bus", details: error.message });
  }
});

module.exports = router;
