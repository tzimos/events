import {combineReducers} from "redux";
import authentication from "./authentication";
import loadingProcedure from "./loading";
import notifications from "./notifications";

const rootReducer = combineReducers({
  authentication,
  loadingProcedure,
  notifications,
});

export default rootReducer;
