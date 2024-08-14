import { combineReducers } from "redux";
import authorizationReducer from "./userState";

const rootReducer = combineReducers({
  userRole: authorizationReducer,
});

export default rootReducer;
