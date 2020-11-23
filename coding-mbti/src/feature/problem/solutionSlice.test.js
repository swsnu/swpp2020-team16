import reducer, {
  solutionCreate,
  solutionRead,
  solutionDelete,
  readSolution,
  createSolution,
  deleteSolution,
  readSolutionOfOthers,
} from './solutionSlice';
import request from '../../utils/request';
import configureStore from '../../configureStore';
import dbdata from './responsesFromBackend/solution.json';
import { cloneObj } from '../../utils/testingUtils';

describe('solutionSlice', () => {
    describe('reducers', () => {
        const initialState = [];
        const payloadValue = {
            id: 1,
            evaluation: 100,
            status: 1,
            problem_id: 22,
            code: 'a=input() b=input() print(a+b)',
            elapsed_time: 33,
            erase_count: 33
        };
        it('sets the solutionRead payload', () => {
            const action = {
                type: solutionRead,
                payload: payloadValue
            };
            const state = reducer(initialState, action);
            expect(state).toEqual([]);
        });
        it('sets the solutionCreate payload', () => {
            const action = {
                type: solutionCreate,
                payload: payloadValue
            };
            const state = reducer(initialState, action);
            expect(state).toEqual([payloadValue]);
        });
        it('sets the solutionDelete payload', () => {
            const action = {
                type: solutionDelete,
                payload: payloadValue
            };
            const state = reducer(initialState, action);
            expect(state).toEqual([]);
        });
    });
    describe('actions', () => {
        describe('readSolution', () => {
            describe('should handle response validity', () => {
                let invalidDataResponse;
                let store;

                beforeEach(async () => {
                    /* GIVEN */
                    request.get = jest.fn();
                    request.post = jest.fn();
                    request.put = jest.fn();
                    request.delete = jest.fn();
                    invalidDataResponse = cloneObj(dbdata.readSolution);
                    store = configureStore().store;
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
                            await store.dispatch(readSolution());
                        } catch (e) {
                            expect(e.message).toBe(`Key "${key}" does not exist.`);
                        }
                    });
                });
                const necessaryKeysInResponseData = [
                    'id', 'evaluation', 'problem_id',
                    'code', 'elapsed_time', 'erase_count'];
                necessaryKeysInResponseData.forEach(key => {
                    it(`key "${key}" does not exist.`, async () => {
                        /* WHEN */
                        delete invalidDataResponse.data[key];
                        request.get.mockResolvedValue({
                            ...invalidDataResponse
                        });

                        /* THEN */
                        try {
                            await store.dispatch(readSolution());
                        } catch (e) {
                            expect(e.message).toBe(`Key "${key}" does not exist.`);
                        }
                    });
                });
            });

            describe('should handle axios without error', () => {
                let store;
                beforeEach(async () => {
                    /* GIVEN */
                    request.get = jest.fn();
                    request.post = jest.fn();
                    request.put = jest.fn();
                    request.delete = jest.fn();
                    store = configureStore().store;
                });

                it('GET', async () => {
                    /* WHEN */
                    request.get.mockResolvedValue({
                        data: dbdata.readSolution.data
                    });
                    await store.dispatch(readSolution());

                    /* THEN */
                    expect(request.get).toHaveBeenCalledWith('problem/solution/');
                });
            });
            describe('should handle reducer without error', () => {
                let store;
                beforeEach(async () => {
                    /* GIVEN */
                    request.get = jest.fn();
                    request.post = jest.fn();
                    request.put = jest.fn();
                    request.delete = jest.fn();
                    store = configureStore().store;
                });

                it('solutionReducer', async () => {
                    /* WHEN */
                    request.get.mockResolvedValue({
                        data: dbdata.readSolution.data
                    });
                    await store.dispatch(readSolution());

                    /* THEN */
                    const state = store.getState().problem.solutionReducer;
                    expect(state).toEqual([]);
                });
            });
        });
        describe('createSolution', () => {
            describe('should handle response validity', () => {
                const problemId = 1;
                const solution = {
                    id: 1,
                    evaluation: 100,
                    status: 1,
                    problem_id: 22,
                    code: 'a=input() b=input() print(a+b)',
                    elapsed_time: 33,
                    erase_count: 33
                };

                let invalidDataResponse;
                let store;

                beforeEach(async () => {
                    /* GIVEN */
                    request.get = jest.fn();
                    request.post = jest.fn();
                    request.put = jest.fn();
                    request.delete = jest.fn();
                    invalidDataResponse = cloneObj(dbdata.createSolution);
                    store = configureStore().store;
                });

                const necessaryKeysInResponse = ['data'];
                necessaryKeysInResponse.forEach(key => {
                    it(`key "${key}" does not exist.`, async () => {
                        /* WHEN */
                        delete invalidDataResponse[key];
                        request.post.mockResolvedValue({
                            ...invalidDataResponse
                        });

                        /* THEN */
                        try {
                            await store.dispatch(createSolution(problemId, solution));
                        } catch (e) {
                            expect(e.message).toBe(`Key "${key}" does not exist.`);
                        }
                    });
                });
                const necessaryKeysInResponseData = ['id'];
                necessaryKeysInResponseData.forEach(key => {
                    it(`key "${key}" does not exist.`, async () => {
                        /* WHEN */
                        delete invalidDataResponse.data[key];
                        request.post.mockResolvedValue({
                            ...invalidDataResponse
                        });

                        /* THEN */
                        try {
                            await store.dispatch(createSolution(problemId, solution));
                        } catch (e) {
                            expect(e.message).toBe(`Key "${key}" does not exist.`);
                        }
                    });
                });
            });

            describe('should handle axios without error', () => {
                const problemId = 1;
                const solution = {
                    id: 1,
                    evaluation: 100,
                    status: 1,
                    problem_id: 22,
                    code: 'a=input() b=input() print(a+b)',
                    elapsed_time: 33,
                    erase_count: 33
                };
                let store;

                beforeEach(async () => {
                    /* GIVEN */
                    request.get = jest.fn();
                    request.post = jest.fn();
                    request.put = jest.fn();
                    request.delete = jest.fn();
                    store = configureStore().store;
                });

                it('POST', async () => {
                    /* WHEN */
                    request.post.mockResolvedValue({
                        data: dbdata.createSolution.data
                    });
                    await store.dispatch(createSolution(problemId, solution));

                    /* THEN */
                    expect(request.post).toHaveBeenCalledTimes(1);
                    expect(request.post).toHaveBeenCalledWith(
                        `problem/${problemId}/solution/`,
                        {
                            code: 'a=input() b=input() print(a+b)',
                            elapsed_time: 33,
                            erase_count: 33,
                            evaluation: 100,
                            id: 1,
                            problem_id: 22,
                            status: 1
                        }
                    );
                });
            });
            describe('should handle reducer without error', () => {
                const problemId = 1;
                const solution = {
                    id: 1,
                    evaluation: 100,
                    status: 1,
                    problem_id: 22,
                    code: 'a=input() b=input() print(a+b)',
                    elapsed_time: 33,
                    erase_count: 33
                };
                let store;

                beforeEach(async () => {
                    /* GIVEN */
                    request.get = jest.fn();
                    request.post = jest.fn();
                    request.put = jest.fn();
                    request.delete = jest.fn();
                    store = configureStore().store;
                });

                it('solutionReducer', async () => {
                    /* WHEN */
                    request.post.mockResolvedValue({
                        data: dbdata.createSolution.data
                    });
                    await store.dispatch(createSolution(problemId, solution));

                    /* THEN */
                    const state = store.getState().problem.solutionReducer;
                    expect(state).toEqual([solution]);
                });
            });
        });
        describe('deleteSolution', () => {
            describe('should handle response validity', () => {
                const solutionId = 1;
                let invalidDataResponse;
                let store;
                beforeEach(async () => {
                    /* GIVEN */
                    request.get = jest.fn();
                    request.post = jest.fn();
                    request.put = jest.fn();
                    request.delete = jest.fn();
                    invalidDataResponse = cloneObj(dbdata.deleteSolution);
                    store = configureStore().store;
                });

                const necessaryKeysInResponse = ['data'];
                necessaryKeysInResponse.forEach(key => {
                    it(`key "${key}" does not exist.`, async () => {
                        /* WHEN */
                        delete invalidDataResponse[key];
                        request.delete.mockResolvedValue({
                            ...invalidDataResponse
                        });

                        /* THEN */
                        try {
                            await store.dispatch(deleteSolution(solutionId));
                        } catch (e) {
                            expect(e.message).toBe(`Key "${key}" does not exist.`);
                        }
                    });
                });
                const necessaryKeysInResponseData = [
                    'id', 'evaluation', 'problem_id',
                    'code', 'elapsed_time', 'erase_count'];
                necessaryKeysInResponseData.forEach(key => {
                    it(`key "${key}" does not exist.`, async () => {
                        /* WHEN */
                        delete invalidDataResponse.data[key];
                        request.delete.mockResolvedValue({
                            ...invalidDataResponse
                        });

                        /* THEN */
                        try {
                            await store.dispatch(deleteSolution(solutionId));
                        } catch (e) {
                            expect(e.message).toBe(`Key "${key}" does not exist.`);
                        }
                    });
                });
            });

            describe('should handle axios without error', () => {
                const solutionId = 1;
                let store;
                beforeEach(async () => {
                    /* GIVEN */
                    request.get = jest.fn();
                    request.post = jest.fn();
                    request.put = jest.fn();
                    request.delete = jest.fn();
                    store = configureStore().store;
                });

                it('POST', async () => {
                    /* WHEN */
                    request.delete.mockResolvedValue({
                        data: dbdata.deleteSolution.data
                    });
                    await store.dispatch(deleteSolution(solutionId));

                    /* THEN */
                    expect(request.delete).toHaveBeenCalledTimes(1);
                    expect(request.delete).toHaveBeenCalledWith(
                        `problem/solution/${solutionId}`
                    );
                });
            });
            describe('should handle reducer without error', () => {
                const solutionId = 1;
                let store;
                beforeEach(async () => {
                    /* GIVEN */
                    request.get = jest.fn();
                    request.post = jest.fn();
                    request.put = jest.fn();
                    request.delete = jest.fn();
                    store = configureStore().store;
                });

                it('solutionReducer', async () => {
                    /* WHEN */
                    request.delete.mockResolvedValue({
                        data: dbdata.createSolution.data
                    });
                    await store.dispatch(deleteSolution(solutionId));

                    /* THEN */
                    const state = store.getState().problem.solutionReducer;
                    expect(state).toEqual([]);
                });
            });
        });
    });
});
