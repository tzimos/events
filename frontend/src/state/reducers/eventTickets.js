import _ from "lodash";
import {
  EVENT_TICKET_REDEEMED,
  EVENT_TICKETS_LOADED,
} from "../actionTypes";

const eventsTicketsInitialState = {
  eventTickets: {
    count: 0,
    next: undefined,
    previous: undefined,
    results: [],
  },
}

const eventTickets = (state = eventsTicketsInitialState, action) => {
  switch (action.type) {
    case EVENT_TICKETS_LOADED:
      return {...state, eventTickets: action.eventTickets};
    case EVENT_TICKET_REDEEMED:
      const clonedEventTickets = _.clonedeep(state.eventTickets);
      const results = clonedEventTickets.results;
      const data =  action.data;
      results.find(result => result.id === data.id).status = data.status;
      return {...state, eventTickets: clonedEventTickets}
    default:
      return state;
  }
};

export default eventTickets;

