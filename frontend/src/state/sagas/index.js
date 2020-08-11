import {
  fork,
  all
} from "redux-saga/effects";
import {watchAuthentication} from "./authentication";
import {watchEvents} from "./events";
import {watchEventTickets} from "./eventTickets";


export function* sagas() {
  yield all([
    fork(watchAuthentication),
    fork(watchEvents),
    fork(watchEventTickets),
  ]);
}
