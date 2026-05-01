import React, { useState } from "react";
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Stack, 
  useTheme, 
  useMediaQuery,
  Menu,
  MenuItem,
  Fade,
  AppBar,
  Toolbar,
  Grid
} from "@mui/material";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AllHomes from "../allhomes";

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ overflowX: "hidden" }}>
      <Box
        sx={{
          height: isMobile ? "85vh" : "90vh",
          width: "100%",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url("/pexels-pixabay-210538.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center 50%", 
          display: "flex",
          alignItems: "center",
          color: "white",
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4} sx={{ maxWidth: isLargeDesktop ? "900px" : "800px" }}>
            <Typography
              variant={isMobile ? "h3" : "h1"}
              fontWeight="900"
              sx={{ 
                lineHeight: 1.05, 
                letterSpacing: "-0.03em", 
                textShadow: "0px 4px 10px rgba(0,0,0,0.5)",
                fontSize: !isMobile && "4.8rem" 
              }}
            >
              The Most Reliable Way <br /> 
              <span style={{ color: "#4dabf7" }}>To Find Your Home.</span>
            </Typography>
            
            <Typography 
              variant="h6" 
              sx={{ 
                opacity: 0.9, 
                fontWeight: "300", 
                maxWidth: "650px",
                fontSize: !isMobile ? "1.4rem" : "1.1rem",
                lineHeight: 1.6
              }}
            >
              Search and discover verified properties for rent or sale in Nigeria's most 
              sought-after locations. Direct contacts and seamless transactions.
            </Typography>

            <Stack direction="row" spacing={3} sx={{ pt: 2 }}>
              <Box>
                <Button
                  onClick={handleClick}
                  variant="contained"
                  size="large"
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{
                    bgcolor: "#fff",
                    color: "#1e3a56",
                    fontWeight: "800",
                    px: 6,
                    py: 2.2,
                    borderRadius: "14px",
                    fontSize: "1rem",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                    "&:hover": { bgcolor: "#f0f0f0", transform: "translateY(-3px)" },
                  }}
                >
                  Get Started
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                  PaperProps={{
                    sx: { 
                      borderRadius: "16px", 
                      mt: 1, 
                      bgcolor: "rgba(255,255,255,0.9)", 
                      backdropFilter: "blur(10px)", // Modern Glassmorphism
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)" 
                    }
                  }}
                >
                  <MenuItem component={Link} to="/properties" onClick={handleClose} sx={{ py: 1.5, px: 4, fontWeight: '600' }}>Browse Gallery</MenuItem>
                  <MenuItem component={Link} to="/login" onClick={handleClose} sx={{ py: 1.5, px: 4 }}>Sign In</MenuItem>
                  <MenuItem component={Link} to="/signup" onClick={handleClose} sx={{ py: 1.5, px: 4 }}>Sign Up</MenuItem>
                </Menu>
              </Box>

              <Button
                component={Link}
                to="/create-listing"
                variant="outlined"
                size="large"
                sx={{
                  color: "#fff",
                  borderColor: "rgba(255,255,255,0.5)",
                  borderWidth: "2px",
                  fontWeight: "700",
                  px: 6,
                  borderRadius: "14px",
                  fontSize: "1rem",
                  transition: "all 0.3s ease",
                  "&:hover": { borderColor: "#4dabf7", color: "#4dabf7", borderWidth: "2px", bgcolor: "rgba(77, 171, 247, 0.05)" },
                }}
              >
                Post a Home
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* --- FEATURED LISTINGS SECTION --- */}
      <Box sx={{ bgcolor: "#fcfcfc", py: { xs: 8, md: 15 } }}>
        <Container maxWidth="lg">
            <Box sx={{ mb: 10, textAlign: "center" }}>
                <Typography variant={isMobile ? "h4" : "h2"} fontWeight="900" color="#1e3a56" gutterBottom>
                    Featured Properties
                </Typography>
                <Box 
                  sx={{ 
                    width: "80px", 
                    height: "4px", 
                    bgcolor: "#4dabf7", 
                    mx: "auto", 
                    mb: 3, 
                    borderRadius: "2px" 
                  }} 
                />
                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: "300", maxWidth: "600px", mx: "auto" }}>
                    Handpicked premium homes in Jos, Lagos, and Abuja, verified for your peace of mind.
                </Typography>
            </Box>
            
            <AllHomes />
        </Container>
      </Box>
    </Box>
  );
};

export default Home;