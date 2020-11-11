import { createSlice } from '@reduxjs/toolkit';
import request from '../../utils/request';

const solutionSlice = createSlice({
    name: 'solution',
    initialState: [],
    reducers: {
        solutionCreate: {
            reducer(state, action) {
                state.push(action.payload);
            }
        },
        solutionRead: {
            reducer(state, action) {
                state = action.payload;
            }
        },
        solutionDelete: {
            reducer(state, action) {
                state = state.filter(solution => solution.id !== action.payload);
            }
        }
    }
});

export const { solutionCreate, solutionRead, solutionDelete } = solutionSlice.actions;
export default solutionSlice.reducer;

export const readSolution = () => async dispatch => {
    const res = await request.get('problem/solution/');
    dispatch(solutionRead(res.data));
};

export const createSolution = (problemId, solution) => async dispatch => {
    const res = await request.post(`problem/${problemId}/solution/`, solution);
    dispatch(solutionCreate(solution));
    return res.data.id;
};

export const deleteSolution = solutionId => async dispatch => {
    await request.delete(`problem/solution/${solutionId}`);
    dispatch(solutionDelete(solutionId));
};
