const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Import Routes
const busRoutes = require("./routes/busRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB Connection
const DB_NAME = "bus_ticket_db";
const MONGO_URI = `mongodb://127.0.0.1:27017/${DB_NAME}`;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((error) => {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1); // Exit if DB connection fails
  });

// ✅ Debugging Middleware (Logs Requests, only in Development Mode)
if (process.env.NODE_ENV !== "production") {
  app.use((req, res, next) => {
    console.log(`📥 [${req.method}] ${req.url}`, req.body);
    next();
  });
}

// ✅ Register Routes
app.use("/api/bus", busRoutes);
app.use("/api/booking", bookingRoutes); // Includes cancel ticket functionality
app.use("/api/users", userRoutes);

// ✅ Root Endpoint
app.get("/", (req, res) => {
  res.send("🚀 Bus Ticket Booking API is running...");
});

// ✅ Global Error Handler (Handles all API errors)
app.use((err, req, res, next) => {
  console.error("❌ Global Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
