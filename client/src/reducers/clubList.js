import {
    YELP_SEARCH,
    ASYNC_START,
    ASYNC_END
} from '../constants/actionTypes';


// state should be array, not object
// why is it object in realworld?
// because it sucks

// const defaultState = [];
const defaultState = {
    data: []
};

export default (state = defaultState, action) => {
    // let state = [...defaultState];
    switch (action.type) {
        case ASYNC_START:

            return {
                ...state,
                loading: action.subtype === YELP_SEARCH ? true : state.loading
            };
        // case ASYNC_END:
        //     console.log('end',action);
        //     return {
        //         ...state,
        //         loading: action.subtype === YELP_SEARCH ? false : state.loading
        //     };

        case YELP_SEARCH:
            // console.log(action);
            // return state;
            // return action.payload;
            return {
                ...state,
                data: action.payload,
                loading: false
            };

        default:
            return state;
    }
};
