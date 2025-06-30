import React from "react";
import AddBusForm from "../components/AddBusForm";
import { Box, Typography, Paper } from "@mui/material";

const AddBus = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #fdfbfb, #ebedee)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          maxWidth: 800,
          width: "100%",
          p: 4,
          borderRadius: 4,
          background: "linear-gradient(to bottom, #ffffff, #fbe7e7)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            mb: 3,
            background: "linear-gradient(90deg, #ff6ec4, #7873f5)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          🚌 Add New Bus
        </Typography>

        <AddBusForm />
      </Paper>
    </Box>
  );
};

export default AddBus;
