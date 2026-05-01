import React, { useState, useEffect } from "react";
import { 
  Container, Paper, TextField, Button, Typography, 
  Box, Stack, Alert, Breadcrumbs, Divider 
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../actions/auth.Action";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Logic: Default to an empty object {} if state.auth is undefined to prevent crashes
  const auth = useSelector((state) => state.auth || {});

  const handleSignup = (e) => {
    e.preventDefault();
    const user = { 
      name: `${firstName} ${lastName}`, 
      email, 
      password, 
      phoneNumber 
    };
    dispatch(signup(user));
  };

  useEffect(() => {
    // Logic: Added Optional Chaining (?.) here
    if (auth?.message) {
      setTimeout(() => {
        navigate("/login", { state: { msg: auth.message } });
      }, 2500);
    }
  }, [auth?.message, navigate]);

  return (
    <Box sx={{ bgcolor: "#fcfcfc", minHeight: "100vh" }}>
      
      {/* --- CINEMATIC HEADER --- */}
      <Box 
        sx={{ 
          backgroundImage: `linear-gradient(rgba(15, 32, 50, 0.75), rgba(78, 86, 96, 0.95)), url("/pexels-pixabay-221540.jpg")`, 
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white", 
          pt: { xs: 8, md: 12 }, 
          pb: { xs: 14, md: 20 },
          textAlign: "center",
          borderBottom: '4px solid #4dabf7'
        }}
      >
        <Container maxWidth="lg">
          <Stack alignItems="center" spacing={2}>
            <Typography variant="h2" fontWeight="900" sx={{ letterSpacing: '-0.04em' }}>
              Join the Community.
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.8, fontWeight: 300, maxWidth: '600px' }}>
              Create an account to save properties, post listings, and connect with 
              verified real estate professionals in Nigeria.
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* --- SIGNUP FORM --- */}
      <Container maxWidth="sm" sx={{ mt: -10, pb: 10, position: "relative", zIndex: 5 }}>
        <Paper 
          elevation={10} 
          sx={{ 
            p: { xs: 3, md: 6 }, 
            borderRadius: 5, 
            border: '1px solid rgba(0,0,0,0.05)',
            bgcolor: "rgba(255, 255, 255, 0.98)" 
          }}
        >
          <Typography variant="h4" fontWeight="900" textAlign="center" mb={4} color="#1e3a56">
            Get Started
          </Typography>

          {/* Logic: Added ?. to these checks as well */}
          {auth?.error && <Alert severity="error" variant="filled" sx={{ mb: 3, borderRadius: 2 }}>{auth.error}</Alert>}
          {auth?.message && <Alert severity="success" variant="filled" sx={{ mb: 3, borderRadius: 2 }}>{auth.message}. Redirecting...</Alert>}

          <Box component="form" onSubmit={handleSignup}>
            <Stack spacing={3}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField label="First Name" fullWidth value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                <TextField label="Last Name" fullWidth value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              </Stack>

              <TextField 
                label="Phone Number" 
                fullWidth 
                value={phoneNumber} 
                onChange={(e) => setPhoneNumber(e.target.value)} 
                required 
                placeholder="08012345678"
              />

              <TextField label="Email Address" fullWidth type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              
              <TextField label="Secure Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} required />
              
              <Button 
                type="submit" 
                variant="contained" 
                fullWidth 
                disabled={auth?.loading}
                sx={{ 
                  bgcolor: "#1e3a56", 
                  py: 2, 
                  borderRadius: 3, 
                  fontWeight: "900", 
                  fontSize: "1rem",
                  "&:hover": { bgcolor: "#4dabf7" } 
                }}
              >
                {auth?.loading ? "Creating Account..." : "CREATE ACCOUNT"}
              </Button>
              
              <Divider sx={{ my: 1 }}>
                <Typography variant="caption" color="text.secondary">OR</Typography>
              </Divider>

              <Typography variant="body2" textAlign="center">
                Already have an account? <Link to="/login" style={{ color: "#4dabf7", fontWeight: "bold", textDecoration: "none" }}>Login here</Link>
              </Typography>
            </Stack>
          </Box>
        </Paper>
      </Container>

    </Box>
  );
};

export default Signup;