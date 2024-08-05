import { combineReducers } from "redux";
import darkModeReducer from "./darkMode";

const rootReducer = combineReducers({
  darkMode: darkModeReducer,
});

export default rootReducer;
