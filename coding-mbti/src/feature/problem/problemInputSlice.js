import { createSlice } from '@reduxjs/toolkit';
import request from '../../utils/request';

const problemInputSlice = createSlice({
    name: 'problemInput',
    initialState: {},
    reducers: {
        problemInputRead: {
            reducer(state, action) {
                action.payload.forEach(element => {
                    state[element.id] = element;
                });
            }
        }
    }
});

export const { problemInputRead } = problemInputSlice.actions;
export default problemInputSlice.reducer;

export const readProblemInput = problemId => async dispatch => {
    const res = await request.get(`problem/${problemId}/input/`);
    dispatch(problemInputRead(res.data));
};
