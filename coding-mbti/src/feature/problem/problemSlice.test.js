import reducer, {
    problemRead,
    readProblem
} from './problemSlice';
import request from '../../utils/request';
import configureStore from '../../configureStore';
import dbdata from './responsesFromBackend/problem.json';
import { cloneObj } from '../../utils/testingUtils';

const { store } = configureStore();

describe('problemSlice', () => {
    describe('reducers', () => {
        const initialState = {
            desc: '',
            input_desc: '',
            output_desc: '',
            id: '',
            title: '',
            pid: '',
            objective: '',
            error: null,
        };

        it('sets the problemRead payload', () => {
            const action = {
                type: problemRead,
                payload: {
                    title: 'title',
                    desc: 'desc',
                    input_desc: 'input_desc',
                    output_desc: 'output_desc',
                    id: 1,
                    pid: 'aizu pid',
                    objective: 1,
                }
            };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                title: 'title',
                desc: 'desc',
                input_desc: 'input_desc',
                output_desc: 'output_desc',
                id: 1,
                pid: 'aizu pid',
                objective: 1,
                error: null,
            });
        });
    });
    describe('actions', () => {
        describe('readProblem', () => {
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

                const necessaryKeysInResponse = ['data'];
                necessaryKeysInResponse.forEach(key => {
                    it(`key "${key}" does not exist.`, async () => {
                        /* WHEN */
                        delete invalidDataResponse[key];
                        request.get.mockResolvedValue({
                            ...invalidDataResponse
                        });

                        /* THEN */
                        try {
                            await store.dispatch(readProblem(problemId));
                        } catch (e) {
                            expect(e.message).toBe(`Key "${key}" does not exist.`);
                        }
                    });
                });
                const necessaryKeysInResponseData = [
                    'id', 'pid', 'desc',
                    'input_desc', 'output_desc', 'title', 'objective'];
                necessaryKeysInResponseData.forEach(key => {
                    it(`key "${key}" does not exist.`, async () => {
                        /* WHEN */
                        delete invalidDataResponse.data[key];
                        request.get.mockResolvedValue({
                            ...invalidDataResponse
                        });

                        /* THEN */
                        try {
                            await store.dispatch(readProblem(problemId));
                        } catch (e) {
                            expect(e.message).toBe(`Key "${key}" does not exist.`);
                        }
                    });
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
                    await store.dispatch(readProblem(problemId));

                    /* THEN */
                    expect(request.get).toHaveBeenCalledWith(`problem/${problemId}/`);
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
                    await store.dispatch(readProblem(problemId));

                    /* THEN */
                    const state = store.getState().problem.problemReducer;
                    const result = cloneObj(dbdata.data);
                    expect(state).toEqual({ ...result, error: null });
                });
            });
        });
    });
});
