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
                            await store.dispatch(readUserReport());
                        } catch (e) {
                            expect(e.message).toBe(`Key "${key}" does not exist.`);
                        }
                    });
                });
                const necessaryKeysInResponseData = [
                    'id', 'title', 'author',
                    'UM_prediction', 'UM_probability', 'EF_prediction', 'EF_probability',
                    'TI_prediction', 'TI_probability', 'JC_prediction', 'JC_probability'];
                necessaryKeysInResponseData.forEach(key => {
                    it(`key "${key}" does not exist.`, async () => {
                        /* WHEN */
                        delete invalidDataResponse.data[key];
                        request.get.mockResolvedValue({
                            ...invalidDataResponse
                        });

                        /* THEN */
                        try {
                            await store.dispatch(readUserReport());
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
