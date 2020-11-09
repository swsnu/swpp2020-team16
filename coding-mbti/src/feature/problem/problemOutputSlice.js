import { createSlice } from '@reduxjs/toolkit';

const problemOutputSlice = createSlice({
    name: 'problemOutput',
    initialState: [],
    reducers: {
        readProblemOutput: {
            reducer(state, action) {
                state = action.payload;
            }
        }
    }
});

export const { readProblemOutput } = problemOutputSlice.actions;
export default problemOutputSlice.reducer;