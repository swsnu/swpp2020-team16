import { createSlice } from '@reduxjs/toolkit';
import CryptoJS from 'crypto-js';
import request from '../../utils/request';

const userSlice = createSlice({
    name: 'usersignin',
    initialState: {
        username: null,
        id: null,
    },
    reducers: {
        login: (state, action) => {
            const { id, username } = action.payload;
            state.username = username;
            state.id = id;
        },
    },
});
export default userSlice.reducer;
export const { login } = userSlice.actions;

export const signIn = (signInData) => async (dispatch) => {
    signInData.password = CryptoJS.SHA256(signInData.password);
    const res = await request.post('/user/login/', signInData);
    dispatch(login({ id: res.data.id, username: signInData.username }));
};
