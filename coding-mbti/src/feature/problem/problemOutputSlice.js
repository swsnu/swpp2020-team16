import { createSlice } from '@reduxjs/toolkit';
import request from '../../utils/request';

const problemOutputSlice = createSlice({
  name: 'problemOutput',
  initialState: {},
  reducers: {
    problemOutputRead: {
      reducer(state, action) {
        const { test_cases } = action.payload;
        state.test_cases = test_cases;
      },
    },
  },
});

export const { problemOutputRead } = problemOutputSlice.actions;
export default problemOutputSlice.reducer;

export const readProblemOutput = (problemInputId) => async (dispatch) => {
  const res = await request.get(`problem/${problemInputId}/output/`);

  dispatch(problemOutputRead(res.data));
};
