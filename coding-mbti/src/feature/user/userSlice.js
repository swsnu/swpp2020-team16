/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
import { createSlice } from '@reduxjs/toolkit';
import request from '../../utils/request';
import { InvalidKeyException } from '../../utils/exceptions';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userList: [],
  },
  reducers: {
    userReadByStyle: {
      reducer(state, action) {
        state.userList = [];
        action.payload.forEach((el) => state.userList.push(el));
      },
    },
  },
});

export const { userReadByStyle } = userSlice.actions;

export default userSlice.reducer;

export const readUsersByStyle = (style) => async (dispatch) => {
  const res = await request.get(`user/${style}/`);

  const necessaryKeysInResponse = ['data'];

  necessaryKeysInResponse.map((key) => {
    if (!(key in res)) {
      throw new InvalidKeyException(`Key "${key}" does not exist.`);
    }
  });

  const necessaryKeysInResponseData = ['user_id', 'style'];

  necessaryKeysInResponseData.map((key) => {
    if (!(key in res.data[0])) {
      throw new InvalidKeyException(`Key "${key}" does not exist.`);
    }
  });

  dispatch(userReadByStyle(res.data));
};
