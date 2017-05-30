import {
    YELP_SEARCH,
    ASYNC_START
} from '../constants/actionTypes';


// state should be array, not object
// why is it object in realworld?
// because it sucks

// const defaultState = [];
const defaultState = {
    data: []
};

export default (state = defaultState, action) => {
    
    switch (action.type) {
        case ASYNC_START:

            return {
                ...state,
                loading: action.subtype === YELP_SEARCH ? true : state.loading,
                error: false
            };


        case YELP_SEARCH:
            // console.log(action);

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
                data: action.payload,
                loading: false,
                error: false
            };

        default:
            return state;
    }
};
