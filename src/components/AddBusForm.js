import React, { useState } from "react";
import { TextField, Button, Box, Grid, Typography, Paper } from "@mui/material";
import axios from "axios";

const AddBusForm = () => {
  const [busData, setBusData] = useState({
    name: "",
    source: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    price: "",
    availableSeats: "",
  });

  const handleChange = (e) => {
    setBusData({ ...busData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/bus/add", busData);
      alert("✅ Bus added successfully!");
      setBusData({
        name: "",
        source: "",
        destination: "",
        departureTime: "",
        arrivalTime: "",
        price: "",
        availableSeats: "",
      });
    } catch (error) {
      console.error("❌ Error adding bus:", error);
      alert("Failed to add bus.");
    }
  };

  const fields = [
    {
      label: "🚌 Bus Name",
      name: "name",
      placeholder: "e.g., Sunrise Express",
      helperText: "Enter the official name of the bus.",
    },
    {
      label: "📍 Source Location",
      name: "source",
      placeholder: "e.g., Delhi",
      helperText: "Starting point of the journey.",
    },
    {
      label: "📍 Destination",
      name: "destination",
      placeholder: "e.g., Jaipur",
      helperText: "End point of the journey.",
    },
    {
      label: "🕒 Departure Time",
      name: "departureTime",
      type: "time",
      helperText: "Select the time the bus departs.",
    },
    {
      label: "🕒 Arrival Time",
      name: "arrivalTime",
      type: "time",
      helperText: "Select the time the bus arrives.",
    },
    {
      label: "💸 Price (INR)",
      name: "price",
      type: "number",
      placeholder: "e.g., 599",
      helperText: "Ticket price per seat.",
    },
    {
      label: "💺 Available Seats",
      name: "availableSeats",
      type: "number",
      placeholder: "e.g., 40",
      helperText: "Total seats available for booking.",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "linear-gradient(to right, #fdfbfb, #ebedee)",
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          maxWidth: 750,
          width: "100%",
          p: 4,
          borderRadius: 3,
          background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
          boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          gutterBottom
          sx={{
            background: "linear-gradient(to right, #ff6a00, #ee0979)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 2,
          }}
        >
          🚌 Schedule a New Journey
        </Typography>

        <Typography
          variant="body1"
          textAlign="center"
          sx={{ mb: 4, color: "#555" }}
        >
          Fill in the details below to add a new bus route.
        </Typography>

        <Grid container spacing={2}>
          {fields.map((field, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <TextField
                fullWidth
                label={field.label}
                name={field.name}
                type={field.type || "text"}
                value={busData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                helperText={field.helperText}
                variant="outlined"
                size="small"
                sx={{
                  backgroundColor: "#ffffff",
                  borderRadius: 1,
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#ff4081",
                    },
                  },
                }}
              />
            </Grid>
          ))}

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              size="large"
              onClick={handleSubmit}
              sx={{
                mt: 2,
                py: 1.5,
                fontWeight: 600,
                fontSize: "1rem",
                borderRadius: 2,
                background: "linear-gradient(to right, #00c6ff, #0072ff)",
                transition: "0.3s",
                "&:hover": {
                  background: "linear-gradient(to right, #0072ff, #00c6ff)",
                  transform: "scale(1.02)",
                },
              }}
            >
              🚀 Add Bus
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AddBusForm;
