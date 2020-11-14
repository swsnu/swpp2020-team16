/* eslint-disable camelcase */
import { createSlice } from '@reduxjs/toolkit';
import request from '../../utils/request';
import { InvalidKeyException } from '../../utils/exceptions';

const problemOutputSlice = createSlice({
  name: 'problemOutput',
  initialState: {},
  reducers: {
    problemOutputRead: {
      reducer(state, action) {
        const { content } = action.payload;
        state.content = content;
      },
    },
  },
});

export const { problemOutputRead } = problemOutputSlice.actions;
export default problemOutputSlice.reducer;

export const readProblemOutput = (problemOutputId) => async (dispatch) => {
  const res = await request.get(`problem/${problemOutputId}/output/`);

  if (!('data' in res)) {
    throw new InvalidKeyException('Key `data` does not exist.');
  }
  if (!('id' in res.data)) {
    throw new InvalidKeyException('Key `id` does not exist.');
  }
  if (!('content' in res.data)) {
    throw new InvalidKeyException('Key `content` does not exist.');
  }

  dispatch(problemOutputRead(res.data));
};
