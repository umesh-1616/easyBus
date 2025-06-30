import React, { useState } from "react";
import { Container, Typography, TextField, Button, Paper } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5, textAlign: "center" }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Login
        </Typography>
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
          onClick={handleLogin}
          sx={{ mt: 2 }}
        >
          Login
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          New user? <Link to="/register">Register here</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
