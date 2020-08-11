import {
  EVENTS_LOADED,
} from "../actionTypes";

const eventsInitialState = {
  events: {
    count: 0,
    next: undefined,
    previous: undefined,
    results: [],
  },
}
const events = (state = eventsInitialState, action) => {
  switch (action.type) {
    case EVENTS_LOADED:
      return {...state, events: action.events};
    default:
      return state;
  }
};

export default events;
