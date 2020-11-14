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
        const {
          desc,
          input_desc,
          output_desc,
          id,
          title,
          pid,
          objective,
        } = action.payload;
        state.desc = desc;
        state.output_desc = output_desc;
        state.input_desc = input_desc;
        state.id = id;
        state.title = title;
        state.pid = pid;
        state.objective = objective;
      },
    },
  },
});

export const { problemRead } = problemSlice.actions;

export default problemSlice.reducer;

export const readProblem = (problemId) => async (dispatch) => {
  const res = await request.get(`problem/${problemId}/`);

  if (!('data' in res)) {
    throw new InvalidKeyException('Key `data` does not exist.');
  }
  if (!('id' in res.data)) {
    throw new InvalidKeyException('Key `id` does not exist.');
  }
  if (!('pid' in res.data)) {
    throw new InvalidKeyException('Key `pid` does not exist.');
  }
  if (!('desc' in res.data)) {
    throw new InvalidKeyException('Key `desc` does not exist.');
  }
  if (!('input_desc' in res.data)) {
    throw new InvalidKeyException('Key `input_desc` does not exist.');
  }
  if (!('output_desc' in res.data)) {
    throw new InvalidKeyException('Key `output_desc` does not exist.');
  }
  if (!('title' in res.data)) {
    throw new InvalidKeyException('Key `title` does not exist.');
  }
  if (!('objective' in res.data)) {
    throw new InvalidKeyException('Key `objective` does not exist.');
  }

  dispatch(problemRead(res.data));
};
