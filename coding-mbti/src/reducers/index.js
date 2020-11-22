import { combineReducers } from 'redux';
import problemReducer from '../feature/problem';
import reportReducer from '../feature/report';
import userReducer from '../feature/user';

export default combineReducers({
    problem: problemReducer,
    report: reportReducer,
    user: userReducer,
});
