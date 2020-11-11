import { combineReducers } from 'redux';
import problemReducer from '../feature/problem';
import reportReducer from '../feature/report';

export default combineReducers({
    problem: problemReducer,
    report: reportReducer,
});
