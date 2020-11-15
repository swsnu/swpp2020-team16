import { createSlice } from '@reduxjs/toolkit';
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

export const signUp = (user) => async (dispatch) => {
    const res = await request.post('/user/signup/', user);

    dispatch(signup(res.data));
};
