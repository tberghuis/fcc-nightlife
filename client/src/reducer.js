
import { combineReducers } from 'redux';
import clubList from './reducers/clubList';
import singleClub from './reducers/singleClub';


export default combineReducers({
    clubList,
    singleClub
});
