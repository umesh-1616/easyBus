import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import HomeIcon from "@mui/icons-material/Home";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

const Navbar = () => {
  const navItems = [
    { label: "Home", to: "/", icon: <HomeIcon fontSize="small" /> },
    {
      label: "My Bookings",
      to: "/my-booking",
      icon: <BookOnlineIcon fontSize="small" />,
    },
    {
      label: "Add Bus",
      to: "/add-bus",
      icon: <AddCircleOutlineIcon fontSize="small" />,
    },
    { label: "Login", to: "/login", icon: <LoginIcon fontSize="small" /> },
    {
      label: "Register",
      to: "/register",
      icon: <PersonAddAltIcon fontSize="small" />,
    },
  ];

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "linear-gradient(90deg, #1e3c72, #2a5298)",
        borderRadius: 0,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          px: { xs: 2, sm: 4 },
          minHeight: "64px",
        }}
      >
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            textDecoration: "none",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#ffffff",
              fontFamily: "'Segoe UI', sans-serif",
              letterSpacing: "0.5px",
            }}
          >
            EasyBus
          </Typography>
          <DirectionsBusIcon sx={{ color: "#ffffff", fontSize: 28 }} />
        </Box>

        <Box sx={{ display: "flex", gap: 1.5 }}>
          {navItems.map((item) => (
            <Button
              key={item.to}
              component={Link}
              to={item.to}
              startIcon={item.icon}
              sx={{
                color: "#ffffff",
                fontWeight: 500,
                textTransform: "none",
                fontSize: "1rem",
                px: 2,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
