import React, { useState } from "react";
import { 
  Container, Paper, TextField, Button, Typography, 
  Box, Stack, Alert, Divider, InputAdornment 
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation } from "react-router-dom";
import { login } from "../../actions/auth.Action";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const dispatch = useDispatch();
  const location = useLocation();
  const auth = useSelector((state) => state.auth || {});

  const userLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  if (auth.authenticate) {
    return <Navigate to={"/"} />;
  }

  return (
    <Box 
      sx={{ 
        // Logic: Ensures the image covers 100% of the browser window
        minHeight: "80vh", 
        width: "100vw",
        backgroundImage: `linear-gradient(rgba(126, 134, 144, 0.85), rgba(80, 85, 91, 0.9)), url("/pexels-artbovich-7031407.jpg")`, 
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // Keeps image still during small screen scrolls
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        py: 4
      }}
    >
      <Container maxWidth="xs">
        {/* --- HEADER TEXT --- */}
        <Box sx={{ textAlign: "center", mb: 2, color: "white" }}>
          <Typography variant="h3" fontWeight="900" sx={{ letterSpacing: '-0.04em', mb: 1 }}>
            Welcome Back.
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.8, fontWeight: 300 }}>
            Login to manage your premium listings.
          </Typography>
        </Box>

        {/* --- LOGIN FORM CARD --- */}
        <Paper 
          elevation={24} 
          sx={{ 
            p: { xs: 3, md: 5 }, 
            borderRadius: 6, 
            bgcolor: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(10px)", // Glassmorphism effect
            border: "1px solid rgba(255,255,255,0.2)"
          }}
        >
          {location.state?.msg && !auth.error && (
            <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
              {location.state.msg}
            </Alert>
          )}

          {auth.error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {auth.error}
            </Alert>
          )}

          <Box component="form" onSubmit={userLogin}>
            <Stack spacing={3}>
              <TextField 
                label="Email Address" 
                fullWidth 
                type="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
              />
              
              <TextField 
                label="Password" 
                type="password" 
                fullWidth 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
              />

              <Button 
                type="submit" 
                variant="contained" 
                fullWidth 
                disabled={auth.authenticating}
                sx={{ 
                  bgcolor: "#1e3a56", 
                  py: 1.8, 
                  borderRadius: 3, 
                  fontWeight: "900", 
                  fontSize: "1rem",
                  "&:hover": { bgcolor: "#4dabf7", transform: "translateY(-2px)" },
                  transition: "all 0.2s ease-in-out"
                }}
              >
                {auth.authenticating ? "Verifying..." : "SIGN IN"}
              </Button>

              <Divider>
                <Typography variant="caption" color="text.secondary">SECURE SERVER ACCESS</Typography>
              </Divider>
              
              <Typography variant="body2" textAlign="center">
                New here? <Link to="/signup" style={{ color: "#4dabf7", fontWeight: "bold", textDecoration: "none" }}>Create Account</Link>
              </Typography>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;