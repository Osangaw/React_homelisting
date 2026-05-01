import { authConstants } from "./constants";
import api from "./axios";

export const signup = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.SIGNUP_REQUEST });
    try {
      const res = await api.post("/auth/signup", user);
      if (res.status === 201) {
        dispatch({
          type: authConstants.SIGNUP_SUCCESS,
          payload: { message: res.data.message },
        });
      }
    } catch (error) {
      const { data } = error.response;
      
      // Logic: Extract the specific validation details if they exist
      let errorMsg = data?.message || "Signup failed";

      if (data?.errors) {
        // If errors is an array, join them; if it's an object, get the first value
        if (Array.isArray(data.errors)) {
          errorMsg = data.errors.join(", ");
        } else if (typeof data.errors === 'object') {
          errorMsg = Object.values(data.errors)[0]; // Grabs "Password must be..."
        }
      }

      dispatch({
        type: authConstants.SIGNUP_FAILURE,
        payload: { error: errorMsg },
      });
    }
  };
};

export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    try {
      const res = await api.post("/auth/signin", user);
      if (res.status === 200) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: { token, user },
        });
      }
    } catch (error) {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: error.response?.data?.message || "Login failed" },
      });
    }
  };
};

// LOGOUT ACTION
export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });

    // Logic: Clear browser storage
    localStorage.clear();

    dispatch({ type: authConstants.LOGOUT_SUCCESS });
  };
};

// INITIAL AUTH CHECK (To keep user logged in on page refresh)
export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: { token, user },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: "Failed to login" },
      });
    }
  };
};
