import { createSlice } from '@reduxjs/toolkit';
import request from '../../utils/request';

const problemReportSlice = createSlice({
    name: 'problemReport',
    initialState: {},
    reducers: {
        problemReportRead: {
            reducer(state, action) {
                state = {};
                action.payload.forEach(report => {
                    state[report.id] = report;
                });
            }
        },
        problemReportDelete: {
            reducer(state, action) {
                delete state[action.payload];
            }
        }
    }
});

export const { problemReportRead, problemReportDelete } = problemReportSlice.actions;
export default problemReportSlice.reducer;

export const readProblemReport = () => async dispatch => {
    const res = await request.get('analysis/problem_report/');
    dispatch(problemReportRead(res.data));
};

export const deleteproblemReport = problemReportId => async dispatch => {
    await request.delete(`analysis/problem_report/${problemReportId}`);
    dispatch(problemReportDelete(problemReportId));
};
