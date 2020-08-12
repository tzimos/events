import * as types from "./actionTypes";

// Notifications
export const pushNotification = (payload, autoHideDuration=null, snackBarActions=null) => ({
  type: types.PUSH_NOTICICATION,
  values: payload,
  autoHideDuration: autoHideDuration,
  snackBarActions: snackBarActions,
});
export const closeSnackBar = () => ({type: types.CLOSE_SNACKBAR});

// Loading procedure
export const startLoading = () => ({type: types.START_LOADING});
export const stopLoading = () => ({type: types.STOP_LOADING});


// Authentication
export const userLoggedIn = () => ({type: types.USER_IS_AUTHENTICATED});
export const userLoggedOut = () => ({type: types.USER_NOT_AUTHENTICATED});
export const refreshJWT = () => ({type: types.REFRESH_JWT});
export const logoutUser = () => ({type: types.LOGOUT_REQUESTED});

// Events
export const eventsRequested = (paginationUrl = null) => ({
  type: types.EVENTS_REQUESTED,
  paginationUrl
});
export const eventsLoaded = events => ({type: types.EVENTS_LOADED, events});

// Tickets
export const eventTicketsRequested = (eventPk = null, paginationUrl = null) => ({
  type: types.EVENT_TICKETS_REQUESTED,
  paginationUrl,
  eventPk,
});
export const eventTicketsLoaded = eventTickets => ({
  type: types.EVENT_TICKETS_LOADED,
  eventTickets
});
export const eventTicketRedeemingRequested = (ticketId) => ({
  type: types.EVENT_TICKETS_REDEEMING_REQUESTED,
  ticketId
});
export const eventTicketRedeemed = data => ({
  type: types.EVENT_TICKET_REDEEMED,
  data
});
export const downloadTicketsRequested = filters => ({
  type: types.TICKETS_DOWNLOAD_REQUESTED,
  filters
});
