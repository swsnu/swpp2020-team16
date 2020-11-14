import reducer, {
    userReportRead,
    readUserReport,
    createUserReport,
} from './userReportSlice';
import request from '../../utils/request';
import configureStore from '../../configureStore';
import dbdata from './responsesFromBackend/userReport.json';
import { cloneObj } from '../../utils/testingUtils';

describe('userReportSlice', () => {
    describe('reducers', () => {
        const initialState = {};
        const payloadValue = {
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
            JC_probability: 0.3
        };
        it('sets the userReportRead payload', () => {
            const action = {
                type: userReportRead,
                payload: payloadValue
            };
            const state = reducer(initialState, action);
            expect(state).toEqual(payloadValue);
        });
    });
    describe('actions', () => {
        describe('readUserReport', () => {
            describe('should handle response validity', () => {
                let invalidDataResponse;
                let store;

                beforeEach(async () => {
                    /* GIVEN */
                    request.get = jest.fn();
                    request.post = jest.fn();
                    request.put = jest.fn();
                    request.delete = jest.fn();
                    invalidDataResponse = cloneObj(dbdata);
                    store = configureStore().store;
                });

                it('key `data` does not exist.', async () => {
                    /* WHEN */
                    delete invalidDataResponse.data;
                    request.get.mockResolvedValue({
                        ...invalidDataResponse
                    });

                    /* THEN */
                    try {
                        await store.dispatch(readUserReport());
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
                        await store.dispatch(readUserReport());
                    } catch (e) {
                        expect(e.message).toBe('Key `id` does not exist.');
                    }
                });

                it('key `title` does not exist.', async () => {
                    /* WHEN */
                    delete invalidDataResponse.data.title;
                    request.get.mockResolvedValue({
                        ...invalidDataResponse
                    });

                    /* THEN */
                    try {
                        await store.dispatch(readUserReport());
                    } catch (e) {
                        expect(e.message).toBe('Key `title` does not exist.');
                    }
                });

                it('key `author` does not exist.', async () => {
                    /* WHEN */
                    delete invalidDataResponse.data.author;
                    request.get.mockResolvedValue({
                        ...invalidDataResponse
                    });

                    /* THEN */
                    try {
                        await store.dispatch(readUserReport());
                    } catch (e) {
                        expect(e.message).toBe('Key `author` does not exist.');
                    }
                });

                it('key `UM_prediction` does not exist.', async () => {
                    /* WHEN */
                    delete invalidDataResponse.data.UM_prediction;
                    request.get.mockResolvedValue({
                        ...invalidDataResponse
                    });

                    /* THEN */
                    try {
                        await store.dispatch(readUserReport());
                    } catch (e) {
                        expect(e.message).toBe('Key `UM_prediction` does not exist.');
                    }
                });

                it('key `UM_probability` does not exist.', async () => {
                    /* WHEN */
                    delete invalidDataResponse.data.UM_probability;
                    request.get.mockResolvedValue({
                        ...invalidDataResponse
                    });

                    /* THEN */
                    try {
                        await store.dispatch(readUserReport());
                    } catch (e) {
                        expect(e.message).toBe('Key `UM_probability` does not exist.');
                    }
                });

                it('key `EF_prediction` does not exist.', async () => {
                    /* WHEN */
                    delete invalidDataResponse.data.EF_prediction;
                    request.get.mockResolvedValue({
                        ...invalidDataResponse
                    });

                    /* THEN */
                    try {
                        await store.dispatch(readUserReport());
                    } catch (e) {
                        expect(e.message).toBe('Key `EF_prediction` does not exist.');
                    }
                });
                it('key `EF_probability` does not exist.', async () => {
                    /* WHEN */
                    delete invalidDataResponse.data.EF_probability;
                    request.get.mockResolvedValue({
                        ...invalidDataResponse
                    });

                    /* THEN */
                    try {
                        await store.dispatch(readUserReport());
                    } catch (e) {
                        expect(e.message).toBe('Key `EF_probability` does not exist.');
                    }
                });
                it('key `TI_prediction` does not exist.', async () => {
                    /* WHEN */
                    delete invalidDataResponse.data.TI_prediction;
                    request.get.mockResolvedValue({
                        ...invalidDataResponse
                    });

                    /* THEN */
                    try {
                        await store.dispatch(readUserReport());
                    } catch (e) {
                        expect(e.message).toBe('Key `TI_prediction` does not exist.');
                    }
                });
                it('key `TI_probability` does not exist.', async () => {
                    /* WHEN */
                    delete invalidDataResponse.data.TI_probability;
                    request.get.mockResolvedValue({
                        ...invalidDataResponse
                    });

                    /* THEN */
                    try {
                        await store.dispatch(readUserReport());
                    } catch (e) {
                        expect(e.message).toBe('Key `TI_probability` does not exist.');
                    }
                });
                it('key `JC_prediction` does not exist.', async () => {
                    /* WHEN */
                    delete invalidDataResponse.data.JC_prediction;
                    request.get.mockResolvedValue({
                        ...invalidDataResponse
                    });

                    /* THEN */
                    try {
                        await store.dispatch(readUserReport());
                    } catch (e) {
                        expect(e.message).toBe('Key `JC_prediction` does not exist.');
                    }
                });
                it('key `JC_probability` does not exist.', async () => {
                    /* WHEN */
                    delete invalidDataResponse.data.JC_probability;
                    request.get.mockResolvedValue({
                        ...invalidDataResponse
                    });

                    /* THEN */
                    try {
                        await store.dispatch(readUserReport());
                    } catch (e) {
                        expect(e.message).toBe('Key `JC_probability` does not exist.');
                    }
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
                        data: dbdata.data
                    });
                    await store.dispatch(readUserReport());

                    /* THEN */
                    expect(request.get).toHaveBeenCalledWith('analysis/');
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
                        data: dbdata.data
                    });
                    await store.dispatch(readUserReport());

                    /* THEN */
                    const state = store.getState().report.userReportReducer;
                    expect(state).toEqual(dbdata.data);
                });
            });
        });
        describe('createUserReport', () => {
            describe('should handle response validity', () => {
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
                    request.post.mockResolvedValue({
                        data: dbdata.data
                    });
                    await store.dispatch(createUserReport());

                    /* THEN */
                    expect(request.post).toHaveBeenCalledWith('analysis/');
                });
            });
            describe('should handle reducer without error', () => {
            });
        });
    });
});
