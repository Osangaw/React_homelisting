import { listingConstants } from "../actions/constants";

const initState = {
  listings: [],
  // Logic: Initializing as null or including the keys prevents the "undefined" crash
  productDetails: {
    homePictures: [],
    name: "",
    price: 0,
    description: ""
  }, 
  loading: false,
  error: null,
  message: "",
};

export default (state = initState, action) => {
  switch (action.type) {
    case listingConstants.CREATELISTING_REQUEST:
    case listingConstants.GET_ALL_LISTINGS_REQUEST:
    case listingConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST: // Logic: Unified loading state
      return {
        ...state,
        loading: true,
        error: null,
        message: "",
      };

    case listingConstants.GET_ALL_LISTINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        listings: action.payload.listings,
      };

    case listingConstants.CREATELISTING_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        listings: [...state.listings, action.payload.listing],
      };

    case listingConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        productDetails: action.payload.productDetails,
      };

    case listingConstants.CREATELISTING_FAILURE:
    case listingConstants.GET_ALL_LISTINGS_FAILURE:
    case listingConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    // Logic: Critical for clearing the specific property state when leaving the page
    case "CLEAR_PRODUCT_DETAILS":
      return {
        ...state,
        productDetails: { homePictures: [] },
        error: null
      };

    case "CLEAR_LISTING_MESSAGES":
      return {
        ...state,
        message: "",
        error: null,
      };

    default:
      return state;
  }
};