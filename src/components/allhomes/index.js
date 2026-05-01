import React, { useEffect } from "react";
import { 
  Grid, Card, CardMedia, CardContent, Typography, 
  Box, CircularProgress, Stack, Chip, Divider, Button 
} from "@mui/material";
import { Link } from "react-router-dom"; // Logic: For navigation
import { useDispatch, useSelector } from "react-redux";
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'; 
import { getAllListings } from "../../actions/listing.Action";

const AllHomes = () => {
  const dispatch = useDispatch();
  const { listings, loading } = useSelector((state) => state.listing);

  useEffect(() => {
    dispatch(getAllListings());
  }, [dispatch]);

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
      <CircularProgress size={60} sx={{ color: '#1e3a56' }} />
    </Box>
  );

  return (
    <Stack spacing={6} sx={{ maxWidth: "1100px", mx: "auto", px: { xs: 2, md: 0 } }}>
      {listings?.map((home) => (
        <Card key={home._id} sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          borderRadius: 6, // Softer corners for premium feel
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          border: '1px solid #f0f0f0',
          overflow: 'hidden',
          '&:hover': { 
            boxShadow: '0 25px 50px rgba(30, 58, 86, 0.15)', 
            borderColor: '#4dabf7',
            transform: 'translateY(-8px)'
          }
        }}>
          {/* --- IMAGE SECTION --- */}
          <Box sx={{ 
            width: { xs: '100%', md: '420px' }, 
            height: { xs: '260px', md: 'auto' }, 
            position: 'relative',
            overflow: 'hidden'
          }}>
            <Chip 
              label={home.category?.toUpperCase()} 
              sx={{ 
                position: 'absolute', top: 20, left: 20, 
                bgcolor: home.category === 'rent' ? '#4dabf7' : '#28a745', 
                color: '#fff', fontWeight: '900', zIndex: 2 
              }} 
            />
            <CardMedia
              component="img"
              image={home.image || "/placeholder.jpg"}
              alt={home.title}
              sx={{ 
                height: '100%', 
                width: '100%', 
                objectFit: 'cover',
                transition: '0.5s',
                '&:hover': { transform: 'scale(1.1)' } // Subtle zoom on hover
              }}
            />
          </Box>

          {/* --- CONTENT SECTION --- */}
          <CardContent sx={{ flex: 1, p: { xs: 3, md: 5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="h3" fontWeight="900" color="#1e3a56" sx={{ letterSpacing: '-0.02em' }}>
                  ₦{Number(home.price).toLocaleString()}
                </Typography>
                <Typography variant="h5" fontWeight="700" sx={{ mt: 1, color: '#444' }}>{home.title}</Typography>
                <Stack direction="row" spacing={0.5} alignItems="center" color="text.secondary" sx={{ mt: 1.5 }}>
                  <LocationOnIcon fontSize="small" sx={{ color: '#4dabf7' }} />
                  <Typography variant="body1" fontWeight="500">{home.address}, {home.location}</Typography>
                </Stack>
              </Box>
              
              {/* Logic: Clickable dynamic button */}
              <Button 
                component={Link}
                to={`/property/${home._id}`}
                variant="contained" 
                sx={{ 
                  bgcolor: '#1e3a56', 
                  borderRadius: 3, 
                  px: 4, 
                  py: 1.5,
                  fontWeight: '800',
                  boxShadow: '0 4px 14px 0 rgba(30, 58, 86, 0.39)',
                  '&:hover': { bgcolor: '#4dabf7', boxShadow: '0 6px 20px rgba(77, 171, 247, 0.23)' }
                }}
              >
                VIEW
              </Button>
            </Stack>

            <Divider sx={{ my: 4, opacity: 0.6 }} />

            <Grid container spacing={4}>
              <Grid item xs={4}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Box sx={{ bgcolor: '#f0f4f8', p: 1.2, borderRadius: 2.5 }}><BedIcon sx={{ color: '#1e3a56' }} /></Box>
                  <Typography variant="body1" fontWeight="700" color="#1e3a56">{home.bedrooms} Beds</Typography>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Box sx={{ bgcolor: '#f0f4f8', p: 1.2, borderRadius: 2.5 }}><BathtubIcon sx={{ color: '#1e3a56' }} /></Box>
                  <Typography variant="body1" fontWeight="700" color="#1e3a56">{home.bathrooms} Baths</Typography>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Box sx={{ bgcolor: '#f0f4f8', p: 1.2, borderRadius: 2.5 }}><DirectionsCarIcon sx={{ color: '#1e3a56' }} /></Box>
                  <Typography variant="body1" fontWeight="700" color="#1e3a56">{home.garage || 0} Garage</Typography>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default AllHomes;