import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  Stack,
  Alert,
  CircularProgress,
  MenuItem,
  Autocomplete,
  Breadcrumbs,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch, useSelector } from "react-redux";
import { createListing } from "../../actions/listing.Action";

const countries = [{ label: "Nigeria", code: "NG" }];

const CreateListing = () => {
  const [listing, setListing] = useState({
    title: "",
    description: "",
    price: "",
    category: "rent",
    country: "Nigeria",
    location: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    garage: "0",
  });

  const [homePictures, setHomePictures] = useState([]);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listingState = useSelector((state) => state.listing);

  // Logic: Handle Navigation after success
  useEffect(() => {
    if (listingState.message) {
      // Clear message and navigate to properties page
      setTimeout(() => {
        // We pass the success message via 'state' so the next page can show a popup
        navigate("/properties", {
          state: { success: true, msg: "Property listed successfully!" },
        });
      }, 1500);
    }
  }, [listingState.message, navigate]);

  const categories = [
    { value: "rent", label: "For Rent" },
    { value: "sale", label: "For Sale" },
  ];

  const handleChange = (e) => {
    setListing({ ...listing, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleFileChange = (e) => {
    setHomePictures([...homePictures, ...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !listing.title ||
      !listing.price ||
      !listing.address ||
      homePictures.length === 0
    ) {
      setError(
        "Required fields: Title, Price, Address, and at least one Photo.",
      );
      return;
    }

    const form = new FormData();
    Object.keys(listing).forEach((key) => form.append(key, listing[key]));
    for (let pic of homePictures) {
      form.append("images", pic);
    }

    dispatch(createListing(form));
  };

  return (
    <Box sx={{ bgcolor: "#fcfcfc", minHeight: "100vh" }}>
      {/* --- CINEMATIC HEADER (Matches other pages) --- */}
      <Box
        sx={{
          backgroundImage: `linear-gradient(rgba(15, 32, 50, 0.7), rgba(15, 32, 50, 0.85)), url("/pexels-pixabay-53610.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          pt: { xs: 8, md: 12 },
          pb: { xs: 14, md: 18 },
          textAlign: "center",
          borderBottom: "4px solid #4dabf7",
        }}
      >
        <Container maxWidth="lg">
          <Stack alignItems="center" spacing={2}>
            <Typography
              variant="h2"
              fontWeight="900"
              sx={{ letterSpacing: "-0.04em" }}
            >
              List Your Property.
            </Typography>
            <Typography
              variant="h6"
              sx={{ opacity: 0.8, fontWeight: 300, maxWidth: "600px" }}
            >
              Connect with thousands of verified buyers and renters in Nigeria's
              most trusted real estate marketplace.
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* --- FORM SECTION (Floating Overlap) --- */}
      <Container
        maxWidth="md"
        sx={{ mt: -10, pb: 10, position: "relative", zIndex: 5 }}
      >
        <Paper
          elevation={10}
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: 5,
            border: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 4 }}>
            <AddBusinessIcon sx={{ color: "#1e3a56", fontSize: 35 }} />
            <Typography variant="h5" fontWeight="800" color="#1e3a56">
              Property Details
            </Typography>
          </Stack>

          {listingState.message && (
            <Alert severity="success" sx={{ mb: 3 }} variant="filled">
              {listingState.message}
            </Alert>
          )}
          {(error || listingState.error) && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error || listingState.error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Listing Title"
                name="title"
                value={listing.title}
                onChange={handleChange}
                required
              />

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  select
                  fullWidth
                  label="Category"
                  name="category"
                  value={listing.category}
                  onChange={handleChange}
                >
                  {categories.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  label="Price (₦)"
                  name="price"
                  type="number"
                  value={listing.price}
                  onChange={handleChange}
                  required
                />
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Autocomplete
                  fullWidth
                  options={countries}
                  getOptionLabel={(option) => option.label || ""}
                  value={
                    countries.find((c) => c.label === listing.country) || null
                  }
                  onChange={(e, val) =>
                    setListing({ ...listing, country: val ? val.label : "" })
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Country" />
                  )}
                />
                <TextField
                  fullWidth
                  label="City / State"
                  name="location"
                  value={listing.location}
                  onChange={handleChange}
                  placeholder="e.g. Jos, Plateau"
                />
              </Stack>

              <TextField
                fullWidth
                label="Full Address"
                name="address"
                value={listing.address}
                onChange={handleChange}
                required
              />

              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  label="Beds"
                  name="bedrooms"
                  type="number"
                  value={listing.bedrooms}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Baths"
                  name="bathrooms"
                  type="number"
                  value={listing.bathrooms}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Garage"
                  name="garage"
                  type="number"
                  value={listing.garage}
                  onChange={handleChange}
                />
              </Stack>

              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={4}
                value={listing.description}
                onChange={handleChange}
              />

              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUploadIcon />}
                sx={{
                  py: 2,
                  borderStyle: "dashed",
                  borderWidth: 2,
                  borderRadius: 3,
                  color: "#1e3a56",
                }}
              >
                {homePictures.length > 0
                  ? `${homePictures.length} Photos Selected`
                  : "Upload Professional Photos"}
                <input
                  type="file"
                  hidden
                  multiple
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </Button>

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={listingState.loading}
                sx={{
                  py: 2,
                  backgroundColor: "#1e3a56",
                  fontWeight: "900",
                  borderRadius: 3,
                  "&:hover": { bgcolor: "#4dabf7" },
                }}
              >
                {listingState.loading ? (
                  <CircularProgress size={26} color="inherit" />
                ) : (
                  "PUBLISH LISTING"
                )}
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default CreateListing;
