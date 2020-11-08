import * as actionTypes from '../actions/actionTypes';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_TEST_RESULT:
      const updatedTestResult = { ...state };
      Object.keys(action.payload).forEach((e) => {
        updatedTestResult[e] = action.payload[e];
      });
      return updatedTestResult;
    default:
      break;
  }
  return state;
};

export default reducer;
