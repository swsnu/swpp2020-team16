import reducer, {
    problemOutputRead,
    readProblemOutput
} from './problemOutputSlice';
import request from '../../utils/request';
import configureStore from '../../configureStore';
import dbdata from './problemInputDB.json';

const { store } = configureStore();

describe('problemOutputSlice', () => {
    describe('reducers', () => {
        const initialState = { test_cases: '' };

        it('sets the payload', () => {
            const action = { type: problemOutputRead, payload: { test_cases: 'test output case in string format' } };
            const state = reducer(initialState, action);
            expect(state).toEqual({ test_cases: 'test output case in string format' });
        });
    });
    describe('actions', () => {
        const problemId = 1;

        beforeEach(async () => {
            request.get = jest.fn();
            request.post = jest.fn();
            request.put = jest.fn();
            request.delete = jest.fn();

            request.get.mockResolvedValue({ data: dbdata.data });
            await store.dispatch(readProblemOutput(problemId));
        });

        it('readProblemOutput', () => {
            // const state = store.getState().problem.problemInputReducer;

            expect(request.get).toHaveBeenCalledWith(`problem/${problemId}/output/`);

            // const result = {};
            // dbdata.data.forEach(input => {
            //     result[input.id] = input;
            // });
            // expect(state).toEqual(result);
        });
    });
});
