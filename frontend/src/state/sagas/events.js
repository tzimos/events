import {
  put,
  call,
  takeLatest
} from "@redux-saga/core/effects";
import {EVENTS_REQUESTED} from "../actionTypes";
import {config} from "../../config";
import apiRequest from "../../lib/apiRequest";
import {
  eventsLoaded,
  pushNotification,
  startLoading,
  stopLoading
} from "../actions";
import {strings} from "../../strings";


export function* _eventsRequested(data) {
  yield put(startLoading());
  const {api, resources} = config;
  let paginationParams = data.paginationUrl ? data.paginationUrl.split("?")[1] : "";
  const resource = paginationParams ? resources.eventsList + "?" + paginationParams : resources.eventsList;
  try {
    const response = yield call(apiRequest.get, api, resource, null);
    const data = yield response.json();
    if (response.ok) {
      yield put(eventsLoaded(data));
    }
  } catch (_) {
    yield put(pushNotification({
      status: "error",
      message: strings.unexpectedError
    }));
  }
  yield put(stopLoading());
}

export function* watchEvents() {
  yield takeLatest(EVENTS_REQUESTED, _eventsRequested);
}
