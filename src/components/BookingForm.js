import React, { useState } from "react";
import { TextField, Button, Box, Grid } from "@mui/material";
import axios from "axios";

const BookingForm = ({ setBuses }) => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const searchBuses = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/bus/search`, {
        params: { source, destination },
      });

      setBuses(response.data);
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            label="Source"
            variant="outlined"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            label="Destination"
            variant="outlined"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={searchBuses}
            sx={{ height: "100%" }}
          >
            Find Buses
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BookingForm;
