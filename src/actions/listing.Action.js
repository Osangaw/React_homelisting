import { listingConstants } from "./constants";
import api from "./axios";

export const getAllListings = () => {
  return async (dispatch) => {
    dispatch({ type: listingConstants.GET_ALL_LISTINGS_REQUEST });
    try {
      const res = await api.get("/homes/all");
      if (res.status === 200) {
        dispatch({
          type: listingConstants.GET_ALL_LISTINGS_SUCCESS,
          payload: { listings: res.data.homes }
        });
      }
    } catch (error) {
      console.error("Error fetching listings:", error);
      dispatch({
        type: listingConstants.GET_ALL_LISTINGS_FAILURE,
        payload: { error: "Failed to load listings" }
      });
    }
  };
};

export const createListing = (form) => {
  return async (dispatch) => {
    dispatch({ type: listingConstants.CREATELISTING_REQUEST });
    try {
      console.log('frm',form);
      
      const res = await api.post("/homes/list", form);
      if (res.status === 201) {
        dispatch({
          type: listingConstants.CREATELISTING_SUCCESS,
          payload: { listing: res.data.home, message: res.data.message }
        });
      }
    } catch (error) {
      dispatch({
        type: listingConstants.CREATELISTING_FAILURE,
        payload: { error: error.response?.data?.message || "Error creating listing" }
      });
    }
  };
};

export const getProductDetailsById = (payload) => {
  return async (dispatch) => {
    dispatch({ type: listingConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST });
    try {
      const { id } = payload.params;
      const res = await api.get(`/homes/home/${id}`); // Logic: Matches your backend GET /homes/:id
      if (res.status === 200) {
        dispatch({
          type: listingConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
          payload: { productDetails: res.data.home }
        });
      }
    } catch (error) {
      dispatch({
        type: listingConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
        payload: { error: error.response?.data?.message || "Failed to load details" }
      });
    }
  };
};

export const editListing = (form) => {
  return async (dispatch) => {

    
  }
}