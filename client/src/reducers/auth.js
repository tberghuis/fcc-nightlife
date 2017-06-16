import {
    REGISTER,
    LOGIN,
} from '../constants/actionTypes';

// do i even need this if using express session

const defaultState = {

};

export default (state = defaultState, action) => {



    switch (action.type) {

        // TODO ???
        case REGISTER:
        case LOGIN:

            console.log('action',action);
            return {
                ...state,
                email: action.payload.email,
                username: action.payload.username
            };



        default:
            return state;
    }
};
