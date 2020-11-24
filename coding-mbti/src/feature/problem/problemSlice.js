/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
import { createSlice } from '@reduxjs/toolkit';
import request from '../../utils/request';
import { InvalidKeyException } from '../../utils/exceptions';

const problemSlice = createSlice({
  name: 'problem',
  initialState: {
    desc: '',
    input_desc: '',
    output_desc: '',
    id: '',
    title: '',
    objective: '',
    pid: '',
  },
  reducers: {
    problemRead: {
      reducer(state, action) {
        Object.keys(action.payload).forEach(key => {
          state[key] = action.payload[key];
        });
      },
    },
  },
});

export const { problemRead } = problemSlice.actions;

export default problemSlice.reducer;

export const readProblem = (problemId) => async (dispatch) => {
  const res = await request.get(`problem/${problemId}/`);

  const necessaryKeysInResponse = ['data'];

  necessaryKeysInResponse.forEach((key) => {
    if (!(key in res)) {
      throw new InvalidKeyException(`Key "${key}" does not exist.`);
    }
  });

  const necessaryKeysInResponseData = [
    'id', 'pid', 'desc',
    'input_desc', 'output_desc', 'title', 'objective'];

  necessaryKeysInResponseData.forEach(key => {
    if (!(key in res.data)) {
      throw new InvalidKeyException(`Key "${key}" does not exist.`);
    }
  });

  dispatch(problemRead(res.data));
};
