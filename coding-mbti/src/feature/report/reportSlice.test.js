import { configureStore } from '@reduxjs/toolkit';
import reducer, {
  myReportRead,
  usersByStyleRead,
  otherReportRead,
  createMyReport,
  readMyReport,
  readOtherReport,
  readUsersByStyle,
} from './reportSlice';
import request from '../../utils/request';

const store = configureStore({ reducer });
describe('reducers', () => {
  it('should have good myReportRead reducer', () => {
    const initialState = {
      otherReport: { solutions: [], report: {} },
      myReport: { solutions: [], report: {} },
      selectedUsers: [],
    };
    const payloadValue = {
      solutions: [],
      report: {
        id: 1,
        title: 'title',
        author: 'author',
        UM_prediction: 0.3,
        UM_probability: 0.3,
        EF_prediction: 0.3,
        EF_probability: 0.3,
        TI_prediction: 0.3,
        TI_probability: 0.3,
        JC_prediction: 0.3,
        JC_probability: 0.3,
      },
    };
    const action = {
      type: myReportRead,
      payload: payloadValue,
    };
    const state = reducer(initialState, action);
    expect(state.myReport).toEqual(payloadValue);
  });

  it('should have good otherReportRead reducer', () => {
    const initialState = {
      otherReport: { solutions: [], report: {} },
      myReport: { solutions: [], report: {} },
      selectedUsers: [],
    };
    const payloadValue = {
      solutions: ['hi'],
      report: {
        id: 1,
        author: 'hi',
      },
    };

    const action = {
      type: otherReportRead,
      payload: payloadValue,
    };
    const state = reducer(initialState, action);
    expect(state.otherReport).toEqual(payloadValue);
  });

  it('should have good usersByStyleRead reducer', () => {
    const initialState = {
      otherReport: { solutions: [], report: {} },
      myReport: { solutions: [], report: {} },
      selectedUsers: [],
    };
    const payloadValue = ['a', 'b', 'c'];
    const action = {
      type: usersByStyleRead,
      payload: payloadValue,
    };
    const state = reducer(initialState, action);
    expect(state.selectedUsers).toEqual(payloadValue);
  });
});

describe('action readMyReport', () => {
  beforeEach(async () => {
    request.get = jest.fn();
  });

  it('should dispatch action correctly', async () => {
    request.get.mockResolvedValue({
      data: 'hi',
    });
    await store.dispatch(readMyReport());
    expect(store.getState().myReport.solutions).toEqual('hi');
  });
});

describe('action readOtherReport', () => {
  beforeEach(async () => {
    request.get = jest.fn();
  });

  it('should dispatch action correctly', async () => {
    request.get.mockResolvedValue({
      data: 'hi',
    });
    await store.dispatch(readOtherReport());
    expect(store.getState().otherReport.solutions).toEqual('hi');
  });
});

describe('action readUsersByStyle', () => {
  beforeEach(async () => {
    request.get = jest.fn();
  });

  it('should dispatch action correctly', async () => {
    request.get.mockResolvedValue({
      data: ['1', '2', '3'],
    });
    await store.dispatch(readUsersByStyle(1));
    expect(store.getState().selectedUsers).toEqual(['1', '2', '3']);
  });
});

describe('action creatMyReport', () => {
  beforeEach(async () => {
    request.post = jest.fn();
  });

  it('should dispatch action correctly', async () => {
    request.post.mockResolvedValue({});
    await store.dispatch(createMyReport());
  });
});
