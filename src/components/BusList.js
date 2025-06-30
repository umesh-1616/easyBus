import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Button,
} from "@mui/material";

const BusList = ({ buses }) => {
  const navigate = useNavigate();

  const handleProceedToPayment = (bus) => {
    navigate("/payment", {
      state: {
        busId: bus._id,
        busName: bus.name,
        source: bus.source,
        destination: bus.destination,
        price: bus.price,
        seatsBooked: 1, // Default to 1 seat booking
      },
    });
  };

  return (
    <Paper sx={{ mt: 3, p: 3 }}>
      <Typography variant="h5" color="primary" gutterBottom>
        Available Buses
      </Typography>
      {buses.length === 0 ? (
        <Typography variant="body1" color="error">
          No buses found. Try a different route.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {buses.map((bus) => (
            <Grid item xs={12} key={bus._id}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" color="secondary">
                    {bus.name}
                  </Typography>
                  <Typography>
                    {bus.source} ➡️ {bus.destination}
                  </Typography>
                  <Typography>
                    🕒 Departure: {bus.departureTime} | Arrival:{" "}
                    {bus.arrivalTime}
                  </Typography>
                  <Typography>💰 Price: ₹{bus.price}</Typography>
                  <Typography>
                    🪑 Seats Available: {bus.availableSeats}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 1 }}
                    onClick={() => handleProceedToPayment(bus)}
                  >
                    Book Ticket
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Paper>
  );
};

export default BusList;
