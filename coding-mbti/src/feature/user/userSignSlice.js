/* eslint-disable array-callback-return */
import { createSlice } from '@reduxjs/toolkit';
import CryptoJS from 'crypto-js';
import { InvalidKeyException, ResponseException } from '../../utils/exceptions';
import request from '../../utils/request';

const userSlice = createSlice({
    name: 'usersign',
    initialState: {
        username: null,
        token: null,
        role: null,
        error: null,
    },
    reducers: {
        signin: (state, action) => {
            const { username, token, role } = action.payload;
            state.username = username;
            state.token = token;
            state.role = role;
            state.error = null;
        },
        signInFail: (state, action) => {
            state.error = action.payload;
        },
        signout: (state) => {
            state.username = null;
            state.token = null;
            state.role = null;
            state.error = null;
        },
        signOutFail: (state, action) => {
            state.error = action.payload;
        },
        signUpFail: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
});
export default userSlice.reducer;
export const {
    signout, signin, signInFail, signUpFail, signOutFail, clearError
} = userSlice.actions;

export const signIn = (signInData) => async (dispatch) => {
    signInData.password = CryptoJS.SHA256(signInData.password).toString();
    await request.get('user/token');
    try {
        const res = await request.post('/user/login/', signInData);
        const necessaryKeysInResponse = ['data'];
        if (res.status === 401) {
            throw new ResponseException('wrong username or password');
        }
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
    } catch (error) {
        dispatch(signInFail(error.message));
    }
    return null;
};

export const signOut = () => async (dispatch) => {
    try {
        const res = await request.get('/user/logout/');
        if (res.status === 401) throw new ResponseException('username does not exist.');
        localStorage.clear();
        dispatch(signout());
    } catch (error) {
        return dispatch(signOutFail(error.message));
    }
    return null;
};

export const signUp = (signUpData) => async (dispatch) => {
    signUpData.password = CryptoJS.SHA256(signUpData.password).toString();
    try {
        const res = await request.post('/user/signup/', signUpData);
        if (res.status === 409) throw new ResponseException('username or email already exists');
    } catch (error) {
        dispatch(signUpFail(error.message));
    }
};
