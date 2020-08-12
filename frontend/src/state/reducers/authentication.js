import {
  USER_IS_AUTHENTICATED,
  USER_NOT_AUTHENTICATED
} from "../actionTypes";

const authenticationInitialState = {
  isAuthenticated: false,
};

const authentication = (state = authenticationInitialState, action) => {
  switch (action.type) {
    case USER_IS_AUTHENTICATED:
      return {...state, isAuthenticated: true};
    case USER_NOT_AUTHENTICATED:
      return {...state, isAuthenticated: false};
    default:
      return state;
  }
};

export default authentication;
