/* eslint-disable camelcase */
import { createSlice } from '@reduxjs/toolkit';
import request from '../../utils/request';

const problemSlice = createSlice({
  name: 'problem',
  initialState: {
    desc: '',
    input_desc: '',
    output_desc: '',
    id: '',
    title: '',
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
        } = action.payload;
        state.desc = desc;
        state.output_desc = output_desc;
        state.input_desc = input_desc;
        state.id = id;
        state.title = title;
        state.pid = pid;
      },
    },
  },
});

export const { problemRead } = problemSlice.actions;

export default problemSlice.reducer;

export const readProblem = (problemId) => async (dispatch) => {
  const res = await request.get(`problem/${problemId}/`);
  dispatch(problemRead(res.data));
};
