import * as types from "./actionTypes";

// Notifications
export const pushNotification = payload => ({
  type: types.PUSH_NOTICICATION,
  values: payload
});
export const closeSnackBar = () => ({type: types.CLOSE_SNACKBAR});

// Loading procedure
export const startLoading = () => ({type: types.START_LOADING});
export const stopLoading = () => ({type: types.STOP_LOADING});


// Authentication
export const userLoggedIn = () => ({type: types.USER_IS_AUTHENTICATED});
