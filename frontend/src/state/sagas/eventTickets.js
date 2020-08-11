import FileSaver from "file-saver";
import {
  put,
  call,
  select,
  takeLatest
} from "@redux-saga/core/effects";
import {
  EVENT_TICKETS_REDEEMING_REQUESTED,
  EVENT_TICKETS_REQUESTED, TICKETS_DOWNLOAD_REQUESTED
} from "../actionTypes";
import {config} from "../../config";
import apiRequest from "../../lib/apiRequest";
import format from "string-format";
import {
  eventTicketRedeemed,
  eventTicketsLoaded, pushNotification,
  startLoading,
  stopLoading
} from "../actions";
import {eventPkForTickets} from "../selectors";
import {strings} from "../../strings";


export function* _eventTicketsRequested(data) {
  yield put(startLoading());
  const {api, resources} = config;
  let paginationParams = data.paginationUrl ? data.paginationUrl.split("?")[1] : "";
  let eventPk = data.eventPk ? data.eventPk : yield select(eventPkForTickets);
  const baseUrl = format(resources.eventTickets, eventPk)
  const resource = paginationParams ? baseUrl + "?" + paginationParams : baseUrl;
  try {
    const response = yield call(apiRequest.get, api, resource, null);
    const data = yield response.json();
    if (response.ok) {
      yield put(eventTicketsLoaded(data));
    } else {
      yield put(pushNotification({
        status: "error",
        message: strings.unexpectedError
      }));
    }
  } catch (e) {
    yield put(pushNotification({
      status: "error",
      message: strings.unexpectedError
    }));
  }
  yield put(stopLoading());
}

export function* _redeemTicket(data) {
  const {ticketId} = data;
  yield put(startLoading());
  const {api, resources} = config;
  const resource = format(resources.redeemTicket, ticketId);
  try {
    const response = yield call(apiRequest.patch, api, resource, null);
    const responseData = yield response.json();
    if (response.ok) {
      yield put(eventTicketRedeemed(responseData));
      const notificationPayload = {
        status: "success",
        message: `Successfully redeemed the ticket with id ${responseData.id} for event ${responseData.event.name}`
      }
      yield put(pushNotification(notificationPayload))
    } else {
      yield put(pushNotification({
        status: "error",
        message: responseData.detail
      }));
    }
  } catch (e) {
    yield put(pushNotification({
      status: "error",
      message: strings.unexpectedError
    }));
  }
  yield put(stopLoading());

}

export function* ticketsDownloadRequested(data) {
  const {
    api,
    resources
  } = config
  const response = yield call(apiRequest.post, api, resources.downloadNonRedeemedTickets, data.filters);
  if (response.ok) {
    const responseData = yield response.blob();
    FileSaver.saveAs(responseData, "non_redeemed_tickets.csv")
  } else {
    yield put(pushNotification({
      status: "error",
      message: strings.unexpectedError
    }));
  }
}

export function* watchEventTickets() {
  yield takeLatest(EVENT_TICKETS_REQUESTED, _eventTicketsRequested);
  yield takeLatest(EVENT_TICKETS_REDEEMING_REQUESTED, _redeemTicket);
  yield takeLatest(TICKETS_DOWNLOAD_REQUESTED, ticketsDownloadRequested);
}