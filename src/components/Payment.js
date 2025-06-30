import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { auth } from "../firebaseConfig";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [bookedBus, setBookedBus] = useState(null); // ✅ Store booked bus details

  useEffect(() => {
    if (!state || !state.busId || !state.seatsBooked || !state.price) {
      setMessage("Invalid booking details. Please try again.");
      setOpenModal(true);
    }
  }, [state]);

  const handlePayment = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setMessage("User not logged in");
        setOpenModal(true);
        return;
      }

      setLoading(true);

      const bookingData = {
        userId: user.uid,
        busId: state.busId,
        seatsBooked: state.seatsBooked,
        totalPrice: state.price,
      };

      console.log("📥 Booking Payload:", bookingData);

      // ✅ Send booking request
      const bookingResponse = await axios.post(
        "http://localhost:5000/api/booking/book",
        bookingData,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("✅ Booking Response:", bookingResponse.data);

      // ✅ Fetch Bus Details after booking
      const busResponse = await axios.get(
        `http://localhost:5000/api/bus/${state.busId}`
      );

      console.log("✅ Booked Bus Details:", busResponse.data);
      setBookedBus(busResponse.data); // ✅ Store bus data

      // ✅ Show success message
      setMessage("Booking successful!");
      setOpenModal(true);
    } catch (error) {
      console.error("❌ Payment error:", error);
      setMessage(
        error.response?.data?.error || "Request failed with status code 404"
      );
      setOpenModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5 text-center">
      <Typography variant="h4">Payment</Typography>
      {state && state.price ? (
        <Typography variant="h6">Total Amount: ₹{state.price}</Typography>
      ) : (
        <Typography variant="h6" color="error">
          Error: Booking details missing
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handlePayment}
        disabled={loading || !state || !state.busId}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Pay Now"}
      </Button>

      {/* ✅ Success Popup Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle sx={{ textAlign: "center", color: "green" }}>
          <CheckCircleOutline fontSize="large" color="success" />
        </DialogTitle>
        <DialogContent>
          <Typography variant="h5" align="center">
            {message}
          </Typography>

          {/* ✅ Show Booked Bus Details */}
          {bookedBus && (
            <div style={{ marginTop: "10px", textAlign: "center" }}>
              <Typography variant="h6">Bus Details</Typography>
              <Typography>Name: {bookedBus.name}</Typography>
              <Typography>Source: {bookedBus.source}</Typography>
              <Typography>Destination: {bookedBus.destination}</Typography>
              <Typography>Departure Time: {bookedBus.departureTime}</Typography>
              <Typography>Arrival Time: {bookedBus.arrivalTime}</Typography>
              <Typography>Price: ₹{bookedBus.price}</Typography>
              <Typography>
                Available Seats: {bookedBus.availableSeats}
              </Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          {/* <Button
            onClick={() => navigate("/tickets")}
            variant="contained"
            color="primary"
            fullWidth
          >
            View Ticket
          </Button> */}

          <Button
            onClick={() => navigate("/my-bookings")} // ✅ Navigate to My Bookings
            variant="contained"
            color="primary"
            fullWidth
          >
            View Ticket
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Payment;
