import React, { useState } from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import BookingForm from "./components/BookingForm";
import BusList from "./components/BusList";
import Navbar from "./components/Navbar";
import Payment from "./components/Payment";
import Ticket from "./components/Ticket";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MyBookings from "./pages/MyBookings";
import AddBus from "./pages/AddBus";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
};

const App = () => {
  const [buses, setBuses] = useState([]);

  return (
    <Router>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #007bff, #00c6ff)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
          >
            <Paper elevation={5} sx={{ p: 4, borderRadius: 3 }}>
              <Typography
                variant="h4"
                color="primary"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  mb: 3,
                  color: "#007bff",
                }}
              >
                🚌 EasyBus - Book Your Ticket
              </Typography>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/my-bookings" element={<MyBookings />} />
                <Route path="/add-bus" element={<AddBus />} />
                <Route
                  path="/buses"
                  element={
                    <>
                      <BookingForm setBuses={setBuses} />
                      <BusList buses={buses} />
                    </>
                  }
                />
                <Route path="/payment" element={<Payment />} />
                <Route path="/ticket" element={<Ticket />} />
              </Routes>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    </Router>
  );
};

export default App;
