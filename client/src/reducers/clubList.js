import {
  YELP_SEARCH,
  ASYNC_START,
  RESET_CLUBLIST
} from "../constants/actionTypes";

const defaultState = {
  data: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case RESET_CLUBLIST:
      return defaultState;
    case ASYNC_START:
      return {
        ...state,
        loading: action.subtype === YELP_SEARCH ? true : state.loading,
        error: false
      };
    case YELP_SEARCH:
      if (action.error) {
        return {
          ...state,
          data: [],
          loading: false,
          error: true
        };
      }
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: false
      };
    default:
      return state;
  }
};
