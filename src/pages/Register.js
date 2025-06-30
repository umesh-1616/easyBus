import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios to send user data to backend

const Register = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      // Send user details to backend
      const response = await axios.post("http://localhost:5000/api/users", {
        firebaseId: firebaseUser.uid, // Store Firebase UID
        name,
        email,
        phone,
      });

      console.log("User saved in DB:", response.data);
      setSuccessMessage(true);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5, textAlign: "center" }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Create an Account 🚀
        </Typography>

        <TextField
          fullWidth
          label="Full Name"
          variant="outlined"
          margin="normal"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Phone"
          variant="outlined"
          margin="normal"
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleRegister}
          sx={{ mt: 2 }}
        >
          Register
        </Button>
      </Paper>

      {/* Success Snackbar */}
      <Snackbar
        open={successMessage}
        autoHideDuration={2000}
        onClose={() => setSuccessMessage(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          🎉 Registered Successfully! Redirecting to login...
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={3000}
        onClose={() => setErrorMessage("")}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          ❌ {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Register;
