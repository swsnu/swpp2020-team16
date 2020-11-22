import reducer, {
    problemInputRead,
    readProblemInput
} from './problemInputSlice';
import request from '../../utils/request';
import configureStore from '../../configureStore';
import dbdata from './responsesFromBackend/problemInput.json';
import { cloneObj } from '../../utils/testingUtils';

const { store } = configureStore();

describe('problemInputSlice', () => {
    describe('reducers', () => {
        const initialState = {};

        it('sets the problemInputRead payload', () => {
            const action = {
                type: problemInputRead,
                payload: {
                    problemId: 1,
                    content: ['input 1, input 2, input 3']
                }
            };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                problemId: 1,
                content: ['input 1, input 2, input 3']
            });
        });
    });
    describe('actions', () => {
        describe('readProblemInput', () => {
            describe('should handle response validity', () => {
                let problemId;
                let invalidDataResponse;

                beforeEach(async () => {
                    /* GIVEN */
                    problemId = 1;
                    request.get = jest.fn();
                    request.post = jest.fn();
                    request.put = jest.fn();
                    request.delete = jest.fn();
                    invalidDataResponse = cloneObj(dbdata);
                });

                it('key `data` does not exist.', async () => {
                    /* WHEN */
                    delete invalidDataResponse.data;
                    request.get.mockResolvedValue({
                        ...invalidDataResponse
                    });

                    /* THEN */
                    try {
                        await store.dispatch(readProblemInput(problemId));
                    } catch (e) {
                        expect(e.message).toBe('Key `data` does not exist.');
                    }
                });

                it('key `content` does not exist.', async () => {
                    /* WHEN */
                    delete invalidDataResponse.data[0].content;
                    request.get.mockResolvedValue({
                        ...invalidDataResponse
                    });

                    /* THEN */
                    try {
                        await store.dispatch(readProblemInput(problemId));
                    } catch (e) {
                        expect(e.message).toBe('Key `content` does not exist.');
                    }
                });
            });

            describe('should handle axios without error', () => {
                let problemId;
                beforeEach(async () => {
                    /* GIVEN */
                    problemId = 1;
                    request.get = jest.fn();
                    request.post = jest.fn();
                    request.put = jest.fn();
                    request.delete = jest.fn();
                });

                it('GET', async () => {
                    /* WHEN */
                    request.get.mockResolvedValue({
                        data: dbdata.data
                    });
                    await store.dispatch(readProblemInput(problemId));

                    /* THEN */
                    expect(request.get).toHaveBeenCalledWith(`problem/${problemId}/input/`);
                });
            });
            describe('should handle reducer without error', () => {
                let problemId;
                beforeEach(async () => {
                    /* GIVEN */
                    problemId = 1;
                    request.get = jest.fn();
                    request.post = jest.fn();
                    request.put = jest.fn();
                    request.delete = jest.fn();
                });

                it('problemInputReducer', async () => {
                    /* WHEN */
                    request.get.mockResolvedValue({
                        data: dbdata.data
                    });
                    await store.dispatch(readProblemInput(problemId));

                    /* THEN */
                    const state = store.getState().problem.problemInputReducer;
                    const result = {};
                    result.problemId = problemId;
                    result.content = dbdata.data.map(input => input.content);
                    expect(state).toEqual(result);
                });

                it('problemInputReducer empty', async () => {
                    /* WHEN */
                    request.get.mockResolvedValue({
                        data: []
                    });
                    await store.dispatch(readProblemInput(problemId));

                    /* THEN */
                    const state = store.getState().problem.problemInputReducer;
                    const result = {};
                    result.problemId = problemId;
                    result.content = [];
                    expect(state).toEqual(result);
                });
            });
        });
    });
});
