import {
    REGISTER,
    LOGIN,
    LOGIN_AUTO,
    LOGOUT,
} from '../constants/actionTypes';

// do i even need this if using express session

const defaultState = {
    loggedIn: false
};

export default (state = defaultState, action) => {



    switch (action.type) {


        case LOGIN_AUTO:
            return {
                ...state,
                loggedIn: true,
                email: action.email,
                username: action.username
            };

        // TODO
        // on page refresh, App component will mount axios.get'/auth/login'
        // dispatch to set loggedIn
        case REGISTER:
        case LOGIN:

            console.log('action', action);
            return {
                ...state,
                loggedIn: true,
                email: action.payload.email,
                username: action.payload.username
            };

        case LOGOUT:

            console.log('action', action);
            return {
                ...state,
                loggedIn: false,
                email: null,
                username: null
            };

        default:
            return state;
    }
};
