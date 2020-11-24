/* eslint-disable array-callback-return */
import { createSlice } from '@reduxjs/toolkit';
import CryptoJS from 'crypto-js';
import request from '../../utils/request';
import {
    InvalidKeyException, ResponseException
} from '../../utils/exceptions';

const userSlice = createSlice({
    name: 'usersign',
    initialState: {
        username: null,
        token: null,
    },
    reducers: {
        signin: (state, action) => {
            const { token, username } = action.payload;
            state.username = username;
            state.token = token;
        },
        signout: (state) => {
            state.username = null;
            state.token = null;
        },
    },
});
export default userSlice.reducer;
export const { signout, signin } = userSlice.actions;

export const signIn = (signInData) => async (dispatch) => {
    signInData.password = CryptoJS.SHA256(signInData.password).toString();
    const res = await request.post('/user/login/', signInData);
    if (res.status === 401) {
        throw new ResponseException('wrong username or password');
    }
    const necessaryKeysInResponse = ['data'];
    necessaryKeysInResponse.forEach((key) => {
        if (!(key in res)) {
            throw new InvalidKeyException(`Key "${key}" does not exist.`);
        }
    });
    const necessaryKeysInResponseData = ['token'];
    necessaryKeysInResponseData.forEach(key => {
        if (!(key in res.data)) {
            throw new InvalidKeyException(`Key "${key}" does not exist.`);
        }
    });
    res.data.username = signInData.username;
    localStorage.setItem('token', res.data.token);
    dispatch(signin(res.data));
};

export const signOut = () => async (dispatch) => {
    const res = await request.get('/user/logout/');
    if (res.status === 401) {
        throw new ResponseException('username does not exist.');
    }

    dispatch(signout());
    localStorage.removeItem('token');
};

export const signUp = (signUpData) => async () => {
    signUpData.password = CryptoJS.SHA256(signUpData.password).toString();
    const res = await request.post('/user/signup/', signUpData);
    if (res.status === 409) {
        throw new ResponseException('username or email already exists');
    }
};
