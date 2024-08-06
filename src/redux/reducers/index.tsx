import { combineReducers } from "redux";
import darkModeReducer from "./darkMode";
import authorizationReducer from "./isAuthenticated";

const rootReducer = combineReducers({
  darkMode: darkModeReducer,
  userRole: authorizationReducer,
});

export default rootReducer;
