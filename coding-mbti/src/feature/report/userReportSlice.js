/* eslint-disable array-callback-return */

import { createSlice } from '@reduxjs/toolkit';
import request from '../../utils/request';
import { InvalidKeyException } from '../../utils/exceptions';

const userReportSlice = createSlice({
  name: 'userReport',
  initialState: {},
  reducers: {
    userReportRead: {
      reducer(state, action) {
        Object.keys(action.payload).forEach(key => {
          state[key] = action.payload[key];
        });
      },
    },
  },
});

export const { userReportRead, userReportCreate } = userReportSlice.actions;
export default userReportSlice.reducer;

export const readUserReport = () => async (dispatch) => {
  const res = await request.get('analysis/');

  const necessaryKeysInResponse = ['data'];

  necessaryKeysInResponse.map((key) => {
    if (!(key in res)) {
      throw new InvalidKeyException(`Key "${key}" does not exist.`);
    }
  });

  const necessaryKeysInResponseData = [
    'id', 'title', 'author',
    'UM_prediction', 'UM_probability', 'EF_prediction', 'EF_probability',
    'TI_prediction', 'TI_probability', 'JC_prediction', 'JC_probability'];

  necessaryKeysInResponseData.map(key => {
    if (!(key in res.data)) {
      throw new InvalidKeyException(`Key "${key}" does not exist.`);
    }
  });

  dispatch(userReportRead(res.data));
};

export const createUserReport = () => async () => {
  await request.post('analysis/');
};
