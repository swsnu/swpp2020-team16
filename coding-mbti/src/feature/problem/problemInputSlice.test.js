import reducer, {
    problemInputRead,
    readProblemInput
} from './problemInputSlice';
import request from '../../utils/request';
import configureStore from '../../configureStore';
import dbdata from './problemInputDB.json';

const { store } = configureStore();

describe('problemInputSlice', () => {
    describe('reducers', () => {
        const initialState = { test_cases: '' };

        it('sets the payload', () => {
            const action = {
                type: problemInputRead,
                payload: {
                    id: 1,
                    test_cases: 'test input case in string format'
                }
            };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                test_cases: 'test input case in string format'
            });
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
            await store.dispatch(readProblemInput(problemId));
        });

        it('readProblemInput', () => {
            // const state = store.getState().problem.problemInputReducer;

            expect(request.get).toHaveBeenCalledWith(`problem/${problemId}/input/`);

            // const result = {};
            // dbdata.data.forEach(input => {
            //     result[input.id] = input;
            // });
            // expect(state).toEqual(result);
        });
    });
});
