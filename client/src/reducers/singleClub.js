import {
    SINGLECLUB_GET,
    ASYNC_START
} from '../constants/actionTypes';

const defaultState = {
    data: null
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case ASYNC_START:
            return {
                ...state,
                data: null
            };
        case SINGLECLUB_GET:
            if (action.error) {
                return {
                    ...state,
                    error: true
                };
            }
            return {
                ...state,
                data: action.payload,
                error: false
            };
        default:
            return state;
    }
};
