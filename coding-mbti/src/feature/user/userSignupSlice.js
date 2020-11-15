import { createSlice } from '@reduxjs/toolkit';
import CryptoJS from 'crypto-js';
import request from '../../utils/request';

const userSlice = createSlice({
    name: 'usersignup',
    initialState: {
        user: null,
    },
    reducers: {
        signup: (state, action) => {
            state.user.push({
                email: action.payload.email,
                userName: action.payload.userName,
                password: action.payload.password,
                salt: action.payload.password,
                userType: action.payload.userType,
            });
        },
    },
});
export default userSlice.reducer;
export const { signup } = userSlice.actions;

export const signUp = (signUpData) => async (dispatch) => {
    signUpData.password = CryptoJS.SHA256(signUpData.password);
    const res = await request.post('/user/signup/', signUpData);
    dispatch(signup(res.data));
};
