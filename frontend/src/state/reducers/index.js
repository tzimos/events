import {combineReducers} from "redux";
import authentication from "./authentication";
import loadingProcedure from "./loading";
import notifications from "./notifications";
import events from "./events";
import eventTickets from "./eventTickets";

const rootReducer = combineReducers({
  authentication,
  loadingProcedure,
  notifications,
  events,
  eventTickets,
});

export default rootReducer;
