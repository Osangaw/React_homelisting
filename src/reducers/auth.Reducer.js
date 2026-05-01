import { authConstants } from "../actions/constants";

const initialState = {
  token: null,
  user: {
    name: "",
    email: "",
    phoneNumber: "",
  },
  authenticate: false,
  authenticating: false,
  loading: false,
  error: null,
  message: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    // --- LOGIN ---
    case authConstants.LOGIN_REQUEST:
      return { ...state, authenticating: true, error: null };
    case authConstants.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user, // Logic: Matches your Schema (name, email, etc.)
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
        error: null,
      };
    case authConstants.LOGIN_FAILURE:
      return { 
        ...state, 
        authenticating: false, 
        error: action.payload.error // Server error: "Invalid password" or "User not found"
      };

    // --- SIGNUP ---
    case authConstants.SIGNUP_REQUEST:
      return { ...state, loading: true, error: null };
    case authConstants.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message, // Server success: "Account created successfully"
        error: null,
      };
    case authConstants.SIGNUP_FAILURE:
      return { 
        ...state, 
        loading: false, 
        error: action.payload.error // Server error: "Email already exists"
      };

    // --- LOGOUT ---
    case authConstants.LOGOUT_SUCCESS:
      return { ...initialState };

    default:
      return state;
  }
};