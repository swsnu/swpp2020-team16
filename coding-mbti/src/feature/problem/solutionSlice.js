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
  solutionDelete,
} = solutionSlice.actions;

export default solutionSlice.reducer;

export const readSolution = () => async (dispatch) => {
  const res = await request.get('problem/solution/');
  if (!('data' in res)) {
    throw new InvalidKeyException('Key `data` does not exist.');
  }
  if (!('id' in res.data)) {
    throw new InvalidKeyException('Key `id` does not exist.');
  }
  if (!('evaluation' in res.data)) {
    throw new InvalidKeyException('Key `evaluation` does not exist.');
  }
  if (!('problem_id' in res.data)) {
    throw new InvalidKeyException('Key `problem_id` does not exist.');
  }
  if (!('code' in res.data)) {
    throw new InvalidKeyException('Key `code` does not exist.');
  }
  if (!('elapsed_time' in res.data)) {
    throw new InvalidKeyException('Key `elapsed_time` does not exist.');
  }
  if (!('erase_count' in res.data)) {
    throw new InvalidKeyException('Key `erase_count` does not exist.');
  }
  dispatch(solutionRead(res.data));
};

export const createSolution = (problemId, solution) => async (dispatch) => {
  const res = await request.post(`problem/${problemId}/solution/`, solution);
  if (!('data' in res)) {
    throw new InvalidKeyException('Key `data` does not exist.');
  }
  if (!('id' in res.data)) {
    throw new InvalidKeyException('Key `id` does not exist.');
  }
  dispatch(solutionCreate(solution));
  return res.data.id;
};

export const deleteSolution = (solutionId) => async (dispatch) => {
  const res = await request.delete(`problem/solution/${solutionId}`);
  if (!('data' in res)) {
    throw new InvalidKeyException('Key `data` does not exist.');
  }
  if (!('id' in res.data)) {
    throw new InvalidKeyException('Key `id` does not exist.');
  }
  dispatch(solutionDelete(solutionId));
};
