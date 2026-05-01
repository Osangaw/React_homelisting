import React from "react";
import {
  Box,
  Container,
  Typography,
  Breadcrumbs,
  Divider,
  Grid,
  Stack,
  Fade,
} from "@mui/material";
import { Link } from "react-router-dom";
import AllHomes from "../allhomes";

const PropertiesPage = () => {
  return (
    <Box sx={{ bgcolor: "#fcfcfc", minHeight: "100vh", overflowX: "hidden" }}>
      {/* --- CINEMATIC HEADER --- */}
      <Box
        sx={{
          position: "relative",
          // Logic: Using a premium architectural background
          backgroundImage: `linear-gradient(rgba(15, 32, 50, 0.7), rgba(15, 32, 50, 0.85)), url("/pexels-pixabay-259588.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          color: "white",
          pt: { xs: 8, md: 12 },
          pb: { xs: 16, md: 24 }, // Extra deep padding to let the cards "breathe" on the image
          textAlign: "center",
          borderBottom: "4px solid #4dabf7",
        }}
      >
        <Container maxWidth="lg">
          <Stack alignItems="center" spacing={2.5}>

            <Typography
              variant="h2"
              fontWeight="900"
              sx={{
                fontSize: { xs: "2.8rem", md: "4.8rem" },
                letterSpacing: "-0.05em",
                lineHeight: 1,
                textShadow: "0px 10px 30px rgba(0,0,0,0.4)",
              }}
            >
              Property Gallery.
            </Typography>

            <Typography
              variant="h6"
              sx={{
                opacity: 0.9,
                fontWeight: "300",
                maxWidth: "700px",
                mx: "auto",
                lineHeight: 1.7,
                fontSize: { xs: "1rem", md: "1.3rem" },
                textShadow: "0px 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              Explore our handpicked collection of verified residential and
              commercial spaces. From Jos to Lagos, we find you the home you
              deserve.
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* --- FLOATING PROPERTIES LIST --- */}
      {/* Logic: Fade in makes the "One per line" cards feel more premium on load */}
      <Fade in={true} timeout={1000}>
        <Container
          maxWidth="xl"
          sx={{
            mt: { xs: -12, md: -16 }, // Pulls cards deep into the hero section
            pb: 15,
            px: { xs: 2, md: 8 }, // Wide border spacing for the PC screen edge
            position: "relative",
            zIndex: 5,
          }}
        >
          <AllHomes />
        </Container>
      </Fade>

    </Box>
  );
};

export default PropertiesPage;
