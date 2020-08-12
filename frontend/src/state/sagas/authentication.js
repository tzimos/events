import {
  all,
  call,
  put,
  takeLatest
} from "@redux-saga/core/effects";
import {
  LOGOUT_REQUESTED,
  REFRESH_JWT
} from "../actionTypes";
import {deleteJWT, getJWT, storeJWT} from "../../lib/jwTokenHandler";
import {
  logoutUser,
  startLoading,
  stopLoading,
  userLoggedIn,
  userLoggedOut
} from "../actions";
import apiRequest from "../../lib/apiRequest";
import {config} from "../../config";
import history from "../../lib/history";

export function* _logoutUser() {
  const {routePath} = config;
  yield call(deleteJWT);
  yield put(userLoggedOut());
  history.push(routePath.login);
}

export function* checkAuthenticationOrRefreshJWT() {
  yield put(startLoading());
  let refreshToken = yield call(getJWT, "refresh");
  if (!refreshToken) {
    yield put(stopLoading());
    yield logoutUser();
  }

  const {api, resources, routePath} = config;
  const resource = resources.refreshToken;
  const payload = {refresh: refreshToken};

  try {
    const response = yield call(apiRequest.post, api, resource, payload);
    const data = yield response.json();

    if (response.status === 200) {
      yield call(storeJWT, data);
      yield put(userLoggedIn());
    } else {
      yield call(deleteJWT);
      yield logoutUser();
      history.push(routePath.login);
    }
  } catch (e) {
    yield logoutUser();
  } finally {
    yield put(stopLoading());
  }
}

export function* watchAuthentication() {
  yield all([
    takeLatest(REFRESH_JWT, checkAuthenticationOrRefreshJWT),
    takeLatest(LOGOUT_REQUESTED, _logoutUser),
  ]);
}
