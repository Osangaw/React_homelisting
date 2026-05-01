import { combineReducers } from "redux";
import listingReducer from "./listing.Reducer";
import authReducer from "./auth.Reducer";


const rootReducer = combineReducers({
    auth: authReducer,
    listing: listingReducer
});

export default rootReducer;