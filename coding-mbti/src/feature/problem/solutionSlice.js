/* eslint-disable array-callback-return */
import { createSlice } from '@reduxjs/toolkit';
import request from '../../utils/request';
import { InvalidKeyException } from '../../utils/exceptions';

const solutionSlice = createSlice({
  name: 'solution',
  initialState: [],
  reducers: {
    solutionCreate: {
      reducer(state, action) {
        state.push(action.payload);
      },
    },
    solutionRead: {
      reducer(state, action) {
        state = action.payload;
      },
    },
    solutionOfOthersRead: {
      reducer(state, action) {
        state.push(action.payload);
      },
    },
    solutionDelete: {
      reducer(state, action) {
        state = state.filter((solution) => solution.id !== action.payload);
      },
    },
  },
});

export const {
  solutionCreate,
  solutionRead,
  solutionOfOthersRead,
  solutionDelete,
} = solutionSlice.actions;

export default solutionSlice.reducer;

export const readSolution = () => async (dispatch) => {
  const res = await request.get('problem/solution/');

  const necessaryKeysInResponse = ['data'];
  necessaryKeysInResponse.map((key) => {
    if (!(key in res)) {
      throw new InvalidKeyException(`Key "${key}" does not exist.`);
    }
  });
  const necessaryKeysInResponseData = [
    'id',
    'evaluation',
    'problem_id',
    'code',
    'elapsed_time',
    'erase_count',
  ];
  necessaryKeysInResponseData.map((key) => {
    if (!(key in res.data)) {
      throw new InvalidKeyException(`Key "${key}" does not exist.`);
    }
  });

  dispatch(solutionRead(res.data));
};

export const createSolution = (problemId, solution) => async (dispatch) => {
  const res = await request.post(`problem/${problemId}/solution/`, solution);
  const necessaryKeysInResponse = ['data'];
  necessaryKeysInResponse.map((key) => {
    if (!(key in res)) {
      throw new InvalidKeyException(`Key "${key}" does not exist.`);
    }
  });
  const necessaryKeysInResponseData = ['id'];
  necessaryKeysInResponseData.map((key) => {
    if (!(key in res.data)) {
      throw new InvalidKeyException(`Key "${key}" does not exist.`);
    }
  });
  dispatch(solutionCreate(solution));
  return res.data.id;
};

export const deleteSolution = (solutionId) => async (dispatch) => {
  const res = await request.delete(`problem/solution/${solutionId}`);
  const necessaryKeysInResponse = ['data'];
  necessaryKeysInResponse.map((key) => {
    if (!(key in res)) {
      throw new InvalidKeyException(`Key "${key}" does not exist.`);
    }
  });
  const necessaryKeysInResponseData = ['id'];
  necessaryKeysInResponseData.map((key) => {
    if (!(key in res.data)) {
      throw new InvalidKeyException(`Key "${key}" does not exist.`);
    }
  });
  dispatch(solutionDelete(solutionId));
};

export const readSolutionOfOthers = (userId, problemId) => async (dispatch) => {
  const res = await request.get(`problem/${problemId}/solution/${userId}`);

  const necessaryKeysInResponse = ['data'];
  necessaryKeysInResponse.map((key) => {
    if (!(key in res)) {
      throw new InvalidKeyException(`Key "${key}" does not exist.`);
    }
  });
  const necessaryKeysInResponseData = [
    'id',
    'evaluation',
    'problem_id',
    'code',
    'elapsed_time',
    'erase_cnt',
    'status',
  ];
  necessaryKeysInResponseData.map((key) => {
    if (!(key in res.data)) {
      throw new InvalidKeyException(`Key "${key}" does not exist.`);
    }
  });

  dispatch(solutionOfOthersRead(res.data));
  return res.data;
};
