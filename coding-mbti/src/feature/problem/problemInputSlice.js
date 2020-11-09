import { createSlice } from '@reduxjs/toolkit';

const problemInputSlice = createSlice({
    name: 'problemInput',
    initialState: [],
    reducers: {
        readProblemInput: {
            reducer(state, action) {
                state = action.payload;
            }
        }
    }
});

export const { readProblemInput } = problemInputSlice.actions;
export default problemInputSlice.reducer;
