import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailsById } from "../../actions/listing.Action";
import {
  Container, Grid, Typography, Box, Chip, Stack,
  Button, Paper, Divider, IconButton, Skeleton, Modal,
} from "@mui/material";
import HotelIcon from "@mui/icons-material/Hotel";
import BathtubIcon from "@mui/icons-material/Bathtub";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const PropertyDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const listing = useSelector((state) => state.listing);
  const { productDetails, loading } = listing;

  const [openGallery, setOpenGallery] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(getProductDetailsById({ params: { id } }));
    window.scrollTo(0, 0);
    return () => {
      dispatch({ type: "CLEAR_PRODUCT_DETAILS" });
    };
  }, [id, dispatch]);

  // --- LOGIC: PRELOADING THE NEXT IMAGE ---
  // This fetches the next image in the background so it's ready before the user clicks 'Next'
  useEffect(() => {
    if (openGallery && productDetails?.images?.length > 0) {
      const nextIndex = (currentIndex + 1) % productDetails.images.length;
      const nextImageUrl = productDetails.images[nextIndex].img;
      
      const img = new Image();
      img.src = nextImageUrl;
    }
  }, [currentIndex, openGallery, productDetails]);

  const handleNext = () => {
    if (productDetails?.images) {
      setCurrentIndex((prev) => (prev + 1) % productDetails.images.length);
    }
  };

  const handlePrev = () => {
    if (productDetails?.images) {
      setCurrentIndex((prev) => (prev - 1 + productDetails.images.length) % productDetails.images.length);
    }
  };

  if (loading || !productDetails) {
    return (
      <Container sx={{ py: 10 }}>
        <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 4, mb: 4 }} />
        <Skeleton variant="text" width="60%" height={60} />
        <Skeleton variant="text" width="40%" />
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: "#fcfcfc", minHeight: "100vh" }}>
      
      {/* --- 1. HERO GALLERY SECTION --- */}
      <Box sx={{ position: "relative", height: { xs: "50vh", md: "70vh" }, bgcolor: "#111" }}>
        {productDetails?.images?.length > 0 ? (
          <img
            src={productDetails.images[0].img}
            alt={productDetails?.title || productDetails?.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.9 }}
          />
        ) : (
          <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
            No Images Available
          </Box>
        )}

        <Box sx={{ position: "absolute", bottom: 60, right: 30, zIndex: 100 }}>
          <Button
            variant="contained"
            onClick={() => {
              setCurrentIndex(0);
              setOpenGallery(true);
            }}
            sx={{
              bgcolor: "white",
              color: "#1e3a56",
              fontWeight: "900",
              px: 3,
              borderRadius: "10px",
              boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
              "&:hover": { bgcolor: "#f0f0f0" },
            }}
          >
            View All Photos ({productDetails?.images?.length || 0})
          </Button>
        </Box>
      </Box>

      {/* --- 2. MAIN CONTENT SECTION --- */}
      <Container maxWidth="lg" sx={{ mt: -8, position: "relative", zIndex: 10, pb: 10 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper elevation={4} sx={{ p: { xs: 3, md: 5 }, borderRadius: 6 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={3}>
                <Box>
                  <Chip label={productDetails?.category || "Property"} sx={{ bgcolor: "#4dabf7", color: "white", fontWeight: "bold", mb: 2 }} />
                  <Typography variant="h4" fontWeight="800" color="#1e3a56" gutterBottom>
                    {productDetails?.title || productDetails?.name}
                  </Typography>
                  <Typography variant="h3" fontWeight="900" color="#1e3a56" gutterBottom>
                    ₦{productDetails?.price?.toLocaleString() || "0"}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center" color="text.secondary">
                    <LocationOnIcon fontSize="small" />
                    <Typography variant="h6" fontWeight="400">{productDetails?.location}</Typography>
                  </Stack>
                </Box>
                <Stack direction="row" spacing={1}>
                  <IconButton sx={{ border: "1px solid #eee" }}><ShareIcon /></IconButton>
                  <IconButton sx={{ border: "1px solid #eee" }}><FavoriteBorderIcon /></IconButton>
                </Stack>
              </Stack>

              <Divider sx={{ my: 4 }} />

              <Typography variant="h6" fontWeight="800" mb={3}>Key Features</Typography>
              <Grid container spacing={3} mb={5}>
                <Grid item xs={6} sm={4}>
                  <Paper variant="outlined" sx={{ p: 2, textAlign: "center", borderRadius: 3 }}>
                    <HotelIcon color="primary" sx={{ mb: 1 }} />
                    <Typography variant="h6" fontWeight="700">{productDetails?.bedrooms || 0}</Typography>
                    <Typography variant="caption" color="text.secondary">Bedrooms</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Paper variant="outlined" sx={{ p: 2, textAlign: "center", borderRadius: 3 }}>
                    <BathtubIcon color="primary" sx={{ mb: 1 }} />
                    <Typography variant="h6" fontWeight="700">{productDetails?.bathrooms || 0}</Typography>
                    <Typography variant="caption" color="text.secondary">Bathrooms</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Paper variant="outlined" sx={{ p: 2, textAlign: "center", borderRadius: 3 }}>
                    <DirectionsCarIcon color="primary" sx={{ mb: 1 }} />
                    <Typography variant="h6" fontWeight="700">{productDetails?.garage || 0}</Typography>
                    <Typography variant="caption" color="text.secondary">Parking Spaces</Typography>
                  </Paper>
                </Grid>
              </Grid>

              <Typography variant="h6" fontWeight="800" mb={2}>About this Property</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, fontSize: "1.1rem", whiteSpace: "pre-line" }}>
                {productDetails?.description}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
             <Box sx={{ position: "sticky", top: 100 }}>
               <Paper elevation={6} sx={{ p: 4, borderRadius: 6, textAlign: "center" }}>
                 <Typography variant="h6" fontWeight="900" color="#1e3a56" mb={1}>Interested in this home?</Typography>
                 <Typography variant="body2" color="text.secondary" mb={4}>Contact the verified agent for a physical tour or payment details.</Typography>
                 <Stack spacing={2}>
                   <Button variant="contained" fullWidth size="large" sx={{ bgcolor: "#1e3a56", py: 2, borderRadius: 3, fontWeight: "bold", "&:hover": { bgcolor: "#152a3e" } }}>CALL AGENT</Button>
                   <Button variant="outlined" fullWidth size="large" startIcon={<WhatsAppIcon />} href={`https://wa.me/234${productDetails?.phoneNumber}`} target="_blank" sx={{ py: 2, borderRadius: 3, fontWeight: "bold", borderColor: "#25D366", color: "#25D366", "&:hover": { borderColor: "#128C7E", bgcolor: "#f7fff9" } }}>WHATSAPP CHAT</Button>
                 </Stack>
                 <Divider sx={{ my: 4 }} />
                 <Typography variant="caption" color="text.secondary">Property ID: {productDetails?._id?.substring(0, 8).toUpperCase()}</Typography>
               </Paper>
             </Box>
          </Grid>
        </Grid>
      </Container>

      {/* --- 3. FULLSCREEN GALLERY MODAL --- */}
      <Modal
        open={openGallery}
        onClose={() => setOpenGallery(false)}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "rgba(0,0,0,0.95)" }}
      >
        <Box sx={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", outline: "none" }}>
          
          <IconButton onClick={() => setOpenGallery(false)} sx={{ position: "absolute", top: 20, right: 20, color: "white", bgcolor: "rgba(255,255,255,0.1)", "&:hover": { bgcolor: "rgba(255,255,255,0.2)" } }}>
            <CloseIcon />
          </IconButton>

          <IconButton onClick={handlePrev} sx={{ position: "absolute", left: { xs: 10, md: 40 }, color: "white", bgcolor: "rgba(255,255,255,0.1)", p: 2, zIndex: 110 }}>
            <ArrowBackIosNewIcon />
          </IconButton>

          <Box sx={{ width: "85%", height: "70%", display: "flex", justifyContent: "center" }}>
            <img 
              key={currentIndex} // LOGIC: Key forces a re-mount to stop 'ghosting'
              src={productDetails?.images?.[currentIndex]?.img} 
              alt="Gallery View" 
              style={{ 
                maxWidth: "100%", 
                maxHeight: "100%", 
                objectFit: "contain", 
                borderRadius: "8px", 
                boxShadow: "0 0 50px rgba(0,0,0,0.5)",
                animation: "fadeIn 0.25s ease-in-out"
              }} 
            />
          </Box>

          <IconButton onClick={handleNext} sx={{ position: "absolute", right: { xs: 10, md: 40 }, color: "white", bgcolor: "rgba(255,255,255,0.1)", p: 2, zIndex: 110 }}>
            <ArrowForwardIosIcon />
          </IconButton>

          <Typography sx={{ color: "white", mt: 3, fontWeight: "600", fontSize: "1.2rem", letterSpacing: 2 }}>
            {currentIndex + 1} / {productDetails?.images?.length}
          </Typography>
        </Box>
      </Modal>

      {/* Logic: Inline CSS for the fade-in animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.98); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </Box>
  );
};

export default PropertyDetails;