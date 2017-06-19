import {
    REGISTER,
    LOGIN,
    LOGIN_AUTO,
    LOGOUT,
} from '../constants/actionTypes';

const defaultState = {
    loggedIn: false
};

export default (state = defaultState, action) => {

    switch (action.type) {
        // on page refresh, App component will mount axios.get'/auth/login'
        case LOGIN_AUTO:
            return {
                ...state,
                loggedIn: true,
                email: action.email,
                username: action.username
            };
        case REGISTER:
        case LOGIN:
            return {
                ...state,
                loggedIn: true,
                email: action.payload.email,
                username: action.payload.username
            };
        case LOGOUT:
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
