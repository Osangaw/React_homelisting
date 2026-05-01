import React from 'react';
import { Box, Container, Typography, Stack, useTheme, useMediaQuery, AppBar, Toolbar, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* --- SHARED NAVBAR --- */}
      <AppBar 
        position="sticky" // Logic: Changed to sticky so it stays visible while scrolling
        elevation={0} 
        sx={{ bgcolor: "#1e3a56", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
      >
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          <Typography variant="h6" fontWeight="900" component={Link} to="/" sx={{ color: "white", textDecoration: 'none', letterSpacing: 1 }}>
            HOMELISTING <span style={{ color: "#4dabf7" }}>JS</span>
          </Typography>
          {!isMobile && (
            <Stack direction="row" spacing={4}>
              <Link to="/properties" style={{ color: "white", textDecoration: "none", fontWeight: "500" }}>Browse</Link>
              <Link to="/create-listing" style={{ color: "white", textDecoration: "none", fontWeight: "500" }}>Post Home</Link>
              <Link to="/login" style={{ color: "white", textDecoration: "none", fontWeight: "500" }}>Login</Link>
            </Stack>
          )}
        </Toolbar>
      </AppBar>

      {/* --- DYNAMIC CONTENT --- */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>

      {/* --- SHARED FOOTER --- */}
      <Box sx={{ bgcolor: "#1e3a56", color: "white", py: 4, mt: 'auto' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ mb: 6, textAlign: { xs: "center", md: "left" } }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" fontWeight="900" sx={{ mb: 2 }}>HOMELISTING JS</Typography>
              <Typography variant="body1" sx={{ opacity: 0.6, maxWidth: "400px" }}>
                Connecting you to verified luxury homes across Nigeria. Built with trust and transparency.
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ borderTop: "1px solid rgba(255,255,255,0.1)", pt: 2, textAlign: "center" }}>
            <Typography variant="body2" sx={{ opacity: 0.5 }}>
              © 2026 HomeListing JS. All rights reserved. Professional Real Estate Solutions.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;