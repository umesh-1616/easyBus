import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../firebaseConfig";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Box,
  Chip,
  Button,
} from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { LocationOn, EventSeat, Schedule, Cancel } from "@mui/icons-material";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/booking/tickets/${user.uid}`
        );
        setBookings(response.data);
      } catch (error) {
        console.error("❌ Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  // ✅ Cancel Booking Function
  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/booking/cancel/${bookingId}`
      );
      alert(response.data.message);

      // ✅ Update UI: Remove cancelled booking
      setBookings((prevBookings) =>
        prevBookings.map((ticket) =>
          ticket._id === bookingId ? { ...ticket, status: "Cancelled" } : ticket
        )
      );
    } catch (error) {
      console.error("❌ Error cancelling booking:", error);
      alert("Failed to cancel booking. Please try again.");
    }
  };

  return (
    <Container className="mt-5">
      <Typography variant="h4" gutterBottom>
        My Bookings
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : bookings.length > 0 ? (
        <Grid container spacing={3}>
          {bookings.map((ticket) => (
            <Grid item xs={12} sm={6} md={4} key={ticket._id}>
              <Card sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {ticket.busId.name}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <LocationOn color="primary" />
                    <Typography>From: {ticket.busId.source}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <LocationOn color="secondary" />
                    <Typography>To: {ticket.busId.destination}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Schedule color="action" />
                    <Typography>
                      Departure: {ticket.busId.departureTime}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Schedule color="disabled" />
                    <Typography>Arrival: {ticket.busId.arrivalTime}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <EventSeat color="success" />
                    <Typography>Seats: {ticket.seatsBooked}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <CurrencyRupeeIcon color="error" />
                    <Typography>Total: ₹{ticket.totalPrice}</Typography>
                  </Box>

                  {/* ✅ Status Chip */}
                  <Chip
                    label={
                      ticket.status === "Cancelled" ? "Cancelled" : "Confirmed"
                    }
                    color={ticket.status === "Cancelled" ? "error" : "success"}
                    sx={{ mt: 2 }}
                  />

                  {/* ✅ Cancel Button (Only for active bookings) */}
                  {ticket.status !== "Cancelled" && (
                    // <Button
                    //   variant="contained"
                    //   color="error"
                    //   startIcon={<Cancel />}
                    //   sx={{ mt: 2, width: "100%" }}
                    //   onClick={() => handleCancelBooking(ticket._id)}
                    // >
                    //   Cancel Ticket
                    // </Button>

                    <Button
                      variant="contained"
                      color="error"
                      size="small" // ✅ This makes the button smaller
                      sx={{ mt: 2, px: 2, py: 0.5, fontSize: "0.8rem" }} // ✅ Adjust padding & font size
                      onClick={() => handleCancelBooking(ticket._id)}
                    >
                      Cancel
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No bookings found.</Typography>
      )}
    </Container>
  );
};

export default MyBookings;
