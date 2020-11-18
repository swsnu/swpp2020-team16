import { combineReducers } from 'redux';

import userSignReducer from './userSignSlice';
import userReducer from './userSlice';

export default combineReducers({
  userSignReducer,
  userReducer,
});
