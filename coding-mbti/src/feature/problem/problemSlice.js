/* eslint-disable consistent-return */
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
    error: null,
  },
  reducers: {
    problemRead: {
      reducer(state, action) {
        Object.keys(action.payload).forEach(key => {
          state[key] = action.payload[key];
        });
        state.error = null;
      },
    },
    problemReadFail: {
      reducer(state, action) {
        return {
          desc: '',
          input_desc: '',
          output_desc: '',
          id: '',
          title: '',
          objective: '',
          pid: '',
          error: action.payload,
        };
      }
    }
  },
});

export const { problemRead, problemReadFail } = problemSlice.actions;

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

export const readProblemByObjective = () => async dispatch => {
  try {
    const res = await request.get('problem/objective/');
    dispatch(problemRead(res.data));
    return res.data.id;
  } catch (error) {
    dispatch(problemReadFail(error.message));
  }
};
