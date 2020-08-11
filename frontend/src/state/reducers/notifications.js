import {
  PUSH_NOTICICATION,
  CLOSE_SNACKBAR
} from "../actionTypes";

const DEFAULT_DURATION = 5000
const notificationsInitialState = {
  status: "",
  message: "",
  open: false,
  autoHideDuration: DEFAULT_DURATION,
  snackBarActions: []
};


const notifications = (state = notificationsInitialState, action) => {
  switch (action.type) {
    case PUSH_NOTICICATION:
      return {
        ...state,
        ...action.values,
        open: true,
        autoHideDuration: action.autoHideDuration ? action.autoHideDuration : notificationsInitialState.autoHideDuration,
        snackBarActions: action.snackBarActions ? action.snackBarActions : notificationsInitialState.snackBarActions
      };
    case CLOSE_SNACKBAR:
      return {...state, ...notificationsInitialState};
    default:
      return {...state};
  }
};

export default notifications;
