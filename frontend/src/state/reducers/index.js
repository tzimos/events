import {combineReducers} from "redux";
import authentication from "./authentication";
import loadingProcedure from "./loading";

const rootReducer = combineReducers({
  authentication,
  loadingProcedure,
});

export default rootReducer;
