import { createSlice } from '@reduxjs/toolkit';
import request from '../../utils/request';
import { InvalidKeyException } from '../../utils/exceptions';

const problemInputSlice = createSlice({
  name: 'problemInput',
  initialState: {},
  reducers: {
    problemInputRead: {
      reducer(state, action) {
        const { problemId, content } = action.payload;
        state.problemId = problemId;
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

  const payload = {};
  payload.problemId = problemId;
  payload.content = [];
  if (res.data.length !== 0) {
    payload.content = res.data.map(input => {
      if (!('content' in input)) {
        throw new InvalidKeyException('Key `content` does not exist.');
      }
      return input.content;
    });
  }

  dispatch(problemInputRead(payload));
};
