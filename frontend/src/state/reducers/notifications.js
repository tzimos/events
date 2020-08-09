import {
  PUSH_NOTICICATION,
  CLOSE_SNACKBAR
} from "../actionTypes";

const notificationsInitialState = {
  status: "",
  message: "",
  open: false
};


const notifications = (state = notificationsInitialState, action) => {
  switch (action.type) {
    case PUSH_NOTICICATION:
      return {...state, ...action.values, open: true};
    case CLOSE_SNACKBAR:
      return {...state, ...notificationsInitialState};
    default:
      return {...state};
  }
};

export default notifications;
