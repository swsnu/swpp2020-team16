import { createSlice } from '@reduxjs/toolkit';
import request from '../../utils/request';

const userSlice = createSlice({
    name: 'userlogin',
    initialState: {
        username: null,
        pkid: null,
    },
    reducers: {
        login: (state, action) => {
            Object.keys(action.payload).forEach(key => {
                state[key] = action.payload[key];
            });
        },
    },
});
export default userSlice.reducer;
export const { login } = userSlice.actions;

export const logIn = (username, password) => async (dispatch) => {
    const res = await request.post('/user/login/', { username, password });

    dispatch(login(res.data));
};
