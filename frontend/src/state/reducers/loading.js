import {
  START_LOADING,
  STOP_LOADING,
} from "../actionTypes";


const initialState = {
  loading: false
};

const loadingProcedure = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return {...state, loading: true};
    case STOP_LOADING:
      return {...state, loading: false};
    default:
      return state;
  }
};


export default loadingProcedure;
