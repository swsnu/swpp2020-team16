/* eslint-disable camelcase */
import { createSlice } from '@reduxjs/toolkit';
import request from '../../utils/request';
import { InvalidKeyException } from '../../utils/exceptions';

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
          UM_prediction,
          UM_probability,
          EF_prediction,
          EF_probability,
          TI_prediction,
          TI_probability,
          JC_prediction,
          JC_probability
        } = action.payload;
        state.id = id;
        state.title = title;
        state.author = author;
        state.UM_prediction = UM_prediction;
        state.UM_probability = UM_probability;
        state.EF_prediction = EF_prediction;
        state.EF_probability = EF_probability;
        state.TI_prediction = TI_prediction;
        state.TI_probability = TI_probability;
        state.JC_prediction = JC_prediction;
        state.JC_probability = JC_probability;
      },
    },
  },
});

export const { userReportRead, userReportCreate } = userReportSlice.actions;
export default userReportSlice.reducer;

export const readUserReport = () => async (dispatch) => {
  const res = await request.get('analysis/');
  if (!('data' in res)) {
    throw new InvalidKeyException('Key `data` does not exist.');
  }
  if (!('id' in res.data)) {
    throw new InvalidKeyException('Key `id` does not exist.');
  }
  if (!('title' in res.data)) {
    throw new InvalidKeyException('Key `title` does not exist.');
  }
  if (!('author' in res.data)) {
    throw new InvalidKeyException('Key `author` does not exist.');
  }
  if (!('UM_prediction' in res.data)) {
    throw new InvalidKeyException('Key `UM_prediction` does not exist.');
  }
  if (!('UM_probability' in res.data)) {
    throw new InvalidKeyException('Key `UM_probability` does not exist.');
  }
  if (!('EF_prediction' in res.data)) {
    throw new InvalidKeyException('Key `EF_prediction` does not exist.');
  }
  if (!('EF_probability' in res.data)) {
    throw new InvalidKeyException('Key `EF_probability` does not exist.');
  }
  if (!('TI_prediction' in res.data)) {
    throw new InvalidKeyException('Key `TI_prediction` does not exist.');
  }
  if (!('TI_probability' in res.data)) {
    throw new InvalidKeyException('Key `TI_probability` does not exist.');
  }
  if (!('JC_prediction' in res.data)) {
    throw new InvalidKeyException('Key `JC_prediction` does not exist.');
  }
  if (!('JC_probability' in res.data)) {
    throw new InvalidKeyException('Key `JC_probability` does not exist.');
  }
  dispatch(userReportRead(res.data));
};

export const createUserReport = () => async () => {
  await request.post('analysis/');
};
