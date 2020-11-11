import { createSlice } from '@reduxjs/toolkit';
import request from '../../utils/request';

const problemSlice = createSlice({
    name: 'problem',
    initialState: {},
    reducers: {
        problemRead: {
            reducer(state, action) {
                action.payload.forEach(element => {
                    state[element.id] = element;
                });
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
