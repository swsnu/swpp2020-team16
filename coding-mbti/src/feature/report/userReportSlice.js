import { createSlice } from '@reduxjs/toolkit';
import request from '../../utils/request';

const userReportSlice = createSlice({
  name: 'userReport',
  initialState: {},
  reducers: {
    userReportRead: {
      reducer(state, action) {
        const {
          id,
          title,
          author,
          ml_prediction,
          ml_probability,
          style_prediction,
          style_probability,
        } = action.payload;
        state.id = id;
        state.title = title;
        state.author = author;
        state.ml_prediction = ml_prediction;
        state.ml_probability = ml_probability;
        state.style_prediction = style_prediction;
        state.style_probability = style_probability;
      },
    },
  },
});

export const { userReportRead, userReportCreate } = userReportSlice.actions;
export default userReportSlice.reducer;

export const readUserReport = () => async (dispatch) => {
  const res = await request.get('analysis/');
  console.log(res.data);
  dispatch(userReportRead(res.data));
};

export const createUserReport = () => async () => {
  await request.post('analysis/');
};
