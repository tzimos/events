import {
  fork,
  all
} from "redux-saga/effects";
import {watchAuthentication} from "./authentication";


export function* sagas() {
  yield all([
    fork(watchAuthentication),
  ]);
}
