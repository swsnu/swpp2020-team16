import reducer, {
    problemOutputRead,
    readProblemOutput
} from './problemOutputSlice';
import request from '../../utils/request';
import configureStore from '../../configureStore';
import dbdata from './responsesFromBackend/problemOutput.json';
import { cloneObj } from '../../utils/testingUtils';

const { store } = configureStore();

describe('problemOutputSlice', () => {
    describe('reducers', () => {
        const initialState = {};

        it('sets the problemOutputRead payload', () => {
            const action = {
                type: problemOutputRead,
                payload: {
                    id: 1,
                    content: ['test output case in string format']
                }
            };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                content: ['test output case in string format']
            });
        });
    });
    describe('actions', () => {
        describe('readProblemOutput', () => {
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
                        await store.dispatch(readProblemOutput(problemId));
                    } catch (e) {
                        expect(e.message).toBe('Key `data` does not exist.');
                    }
                });

                it('key `id` does not exist.', async () => {
                    /* WHEN */
                    delete invalidDataResponse.data.id;
                    request.get.mockResolvedValue({
                        ...invalidDataResponse
                    });

                    /* THEN */
                    try {
                        await store.dispatch(readProblemOutput(problemId));
                    } catch (e) {
                        expect(e.message).toBe('Key `id` does not exist.');
                    }
                });

                it('key `content` does not exist.', async () => {
                    /* WHEN */
                    delete invalidDataResponse.data.content;
                    request.get.mockResolvedValue({
                        ...invalidDataResponse
                    });

                    /* THEN */
                    try {
                        await store.dispatch(readProblemOutput(problemId));
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
                    await store.dispatch(readProblemOutput(problemId));

                    /* THEN */
                    expect(request.get).toHaveBeenCalledWith(`problem/${problemId}/output/`);
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

                it('problemOutputReducer', async () => {
                    /* WHEN */
                    request.get.mockResolvedValue({
                        data: dbdata.data
                    });
                    await store.dispatch(readProblemOutput(problemId));

                    /* THEN */
                    const state = store.getState().problem.problemOutputReducer;
                    const result = {};
                    result.content = dbdata.data.content;
                    expect(state).toEqual(result);
                });
            });
        });
    });
});
