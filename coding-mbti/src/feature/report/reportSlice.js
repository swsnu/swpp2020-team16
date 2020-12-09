/* eslint-disable array-callback-return */

import { createSlice } from '@reduxjs/toolkit';
import request from '../../utils/request';

const reportSlice = createSlice({
  name: 'report',
  initialState: {
    otherReport: { solutions: [], report: {} },
    myReport: { solutions: [], report: {} },
    selectedUsers: [],
  },
  reducers: {
    myReportRead: {
      reducer(state, action) {
        const newMyReport = {
          solutions: action.payload.solutions,
          report: action.payload.report,
        };
        state.myReport = newMyReport;
      },
    },
    otherReportRead: {
      reducer(state, action) {
        const newOtherReport = {
          solutions: action.payload.solutions,
          report: action.payload.report,
        };

        state.otherReport = newOtherReport;
      },
    },
    usersByStyleRead: {
      reducer(state, action) {
        const newSelectedUsers = action.payload.map((el) => el);
        state.selectedUsers = newSelectedUsers;
      },
    },
  },
});

export const {
  myReportRead,
  otherReportRead,
  usersByStyleRead,
} = reportSlice.actions;
export default reportSlice.reducer;

export const readMyReport = () => async (dispatch) => {
  try {
    const solutions = await request.get('analysis/my/solutions/');
    const report = await request.get('analysis/my/report/');
    const response = { solutions: solutions.data, report: report.data };

    dispatch(myReportRead(response));
    return true;
  } catch {
    return false;
  }
};

export const createMyReport = () => async () => {
  await request.post('analysis/my/report/');
};

export const readUsersByStyle = (style) => async (dispatch) => {
  const res = await request.get(`analysis/style/${style}/`);
  dispatch(usersByStyleRead(res.data));
  return res.data;
};

export const readOtherReport = (userId) => async (dispatch) => {
  const solutions = await request.get(`analysis/other/${userId}/solutions/`);
  const report = await request.get(`analysis/other/${userId}/report/`);
  const response = { solutions: solutions.data, report: report.data };

  dispatch(otherReportRead(response));
};
