import { combineReducers } from 'redux';
import problemReducer from '../feature/problem';

export default combineReducers({
    problem: problemReducer,
});
