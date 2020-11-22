import { createSlice } from '@reduxjs/toolkit';
import request from '../../utils/request';
import { InvalidKeyException } from '../../utils/exceptions';

const problemOutputSlice = createSlice({
  name: 'problemOutput',
  initialState: {},
  reducers: {
    problemOutputRead: {
      reducer(state, action) {
        const { problemId, content } = action.payload;
        state.problemId = problemId;
        state.content = content;
      },
    },
  },
});

export const { problemOutputRead } = problemOutputSlice.actions;
export default problemOutputSlice.reducer;

export const readProblemOutput = (problemId) => async (dispatch) => {
  const res = await request.get(`problem/${problemId}/output/`);

  if (!('data' in res)) {
    throw new InvalidKeyException('Key `data` does not exist.');
  }
  const payload = {};
  payload.problemId = problemId;
  payload.content = [];
  if (res.data.length !== 0) {
    payload.content = res.data.map(output => {
      if (!('content' in output)) {
        throw new InvalidKeyException('Key `content` does not exist.');
      }
      return output.content;
    });
  }

  dispatch(problemOutputRead(payload));
};
