import { combineReducers } from 'redux';

import problemReducer from './problemSlice';
import problemInputReducer from './problemInputSlice';
import problemOutputReducer from './problemOutputSlice';
import solutionReducer from './solutionSlice';

export default combineReducers({
    problemReducer,
    problemInputReducer,
    problemOutputReducer,
    solutionReducer,
});