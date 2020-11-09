import * as actionTypes from './actionTypes';

export const putTestResult = (data) => ({
  type: actionTypes.UPDATE_TEST_RESULT,
  payload: data,
});
