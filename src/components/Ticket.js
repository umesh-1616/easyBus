import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { auth } from "../firebaseConfig"; // Firebase authentication

const Ticket = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.error("User not logged in");
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/booking/tickets/${user.uid}`
        );

        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 3 }}>
        Your Tickets 🎟️
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : tickets.length === 0 ? (
        <Typography color="error">No tickets found!</Typography>
      ) : (
        tickets.map((ticket) => (
          <Card key={ticket._id} sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6">{ticket.busId.name}</Typography>
              <Typography>
                {ticket.busId.source} ➡ {ticket.busId.destination}
              </Typography>
              <Typography>Seats Booked: {ticket.seatsBooked}</Typography>
              <Typography>Total Price: ₹{ticket.totalPrice}</Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
};

export default Ticket;
