import {
    SINGLECLUB_GET,
    ASYNC_START,
    SINGLECLUB_GET_RESERVATIONS
} from '../constants/actionTypes';

const defaultState = {
    data: null,
    reservationList: [],
    canRemove: false
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case ASYNC_START:
            return {
                ...state,
                data: null
            };

        case SINGLECLUB_GET_RESERVATIONS:
            return {
                ...state,
                reservationList: action.usernames? action.usernames:[],
                canRemove: action.canRemove,
            };

        case SINGLECLUB_GET:
            // console.log(action);
            if (action.error) {
                return {
                    ...state,
                    error: true
                };
            }
            return {
                ...state,
                data: action.payload.data,
                error: false
            };
        default:
            return state;
    }
};
