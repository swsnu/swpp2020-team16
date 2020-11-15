import { combineReducers } from 'redux';

import userSigninReducer from './userSigninSlice';
import userSignupReducer from './userSignupSlice';

export default combineReducers({
    userSigninReducer,
    userSignupReducer
});
