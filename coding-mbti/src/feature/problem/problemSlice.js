import request from '../../utils/request';
import { createSlice } from '@reduxjs/toolkit';

const problemSlice = createSlice({
    name: 'problem',
    initialState: [],
    reducers: {
        problemRead: {
            reducer(state, action) {
                state = [];
                action.payload.forEach(x => state.push(x));
            }
        }
    }
});

export const { problemRead } = problemSlice.actions;

export default problemSlice.reducer;

export const readProblem = () => async dispatch => {
    const res = await request.get('problem/');
    dispatch(problemRead(res.data));
};