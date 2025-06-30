import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundImage:
          "url('https://source.unsplash.com/1600x900/?bus,travel')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        p: 3,
      }}
    >
      {/* Animated Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mt: -2, // Pull text closer to the previous element
            mb: 1, // Reduce bottom margin
            background:
              "linear-gradient(90deg, #ff8c00, #ff0080, #8000ff, #00c3ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "200% 200%",
            animation: "gradientMove 3s ease infinite",
          }}
        >
          🚍 Welcome to EasyBus!
        </Typography>
      </motion.div>

      <style>
        {`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        `}
      </style>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <Typography
          variant="h6"
          sx={{
            maxWidth: "600px",
            mb: 4,

            padding: "10px",
            borderRadius: "8px",
            color: "rgba(0, 0, 0, 0.6)", // White text for better contrast
            textAlign: "center",
          }}
        >
          Your one-stop solution for hassle-free online bus ticket booking. Find
          the best routes, secure your seats, and enjoy your journey!
        </Typography>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Button
            variant="contained"
            component={Link}
            to="/buses"
            sx={{
              background: "linear-gradient(90deg, #ff8c00, #ff0080)",
              color: "#fff",
              fontWeight: "bold",
              px: 3,
              py: 1,
              borderRadius: "20px",
              transition: "all 0.3s",
              "&:hover": { background: "#ff8c00", transform: "scale(1.05)" },
            }}
          >
            Book a Ticket 🎟️
          </Button>

          <Button
            variant="contained"
            component={Link}
            to="/my-bookings"
            sx={{
              backgroundColor: "#ff8c00", // Bright orange for visibility
              color: "#fff", // White text for contrast
              fontWeight: "bold",
              px: 3,
              py: 1,
              borderRadius: "20px",
              transition: "all 0.3s",
              "&:hover": {
                backgroundColor: "#ff4500", // Darker orange on hover
              },
            }}
          >
            My Bookings 📋
          </Button>

          <Button
            variant="contained"
            color="success"
            component={Link}
            to="/login"
            sx={{
              background: "#28a745",
              fontWeight: "bold",
              px: 3,
              py: 1,
              borderRadius: "20px",
              transition: "all 0.3s",
              "&:hover": { background: "#218838", transform: "scale(1.05)" },
            }}
          >
            Login / Register 🔑
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
};

export default Home;
