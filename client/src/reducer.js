import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import clubList from './reducers/clubList';
import singleClub from './reducers/singleClub';
import auth from './reducers/auth';

export default combineReducers({
    clubList,
    singleClub,
    auth,
    form: formReducer
});
