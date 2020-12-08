import { combineReducers } from 'redux';
import groupReducer from './group';
import problemReducer from './problem';
import reportReducer from './report';
import userReducer from './user';

export default combineReducers({
    problem: problemReducer,
    report: reportReducer,
    user: userReducer,
    group: groupReducer,
});
