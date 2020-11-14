/* eslint-disable camelcase */
import { createSlice } from '@reduxjs/toolkit';
import request from '../../utils/request';
import { InvalidKeyException } from '../../utils/exceptions';

const problemInputSlice = createSlice({
  name: 'problemInput',
  initialState: {},
  reducers: {
    problemInputRead: {
      reducer(state, action) {
        const { content } = action.payload;
        state.content = content;
      },
    },
  },
});

export const { problemInputRead } = problemInputSlice.actions;
export default problemInputSlice.reducer;

export const readProblemInput = (problemId) => async (dispatch) => {
  const res = await request.get(`problem/${problemId}/input/`);

  if (!('data' in res)) {
    throw new InvalidKeyException('Key `data` does not exist.');
  }
  if (!('id' in res.data)) {
    throw new InvalidKeyException('Key `id` does not exist.');
  }
  if (!('content' in res.data)) {
    throw new InvalidKeyException('Key `content` does not exist.');
  }

  dispatch(problemInputRead(res.data));
};
