import { combineReducers } from 'redux';

import groupReducer from './groupSlice';
import groupInvitationReducer from './groupInvitationSlice';

export default combineReducers({
    groupReducer,
    groupInvitationReducer,
});
