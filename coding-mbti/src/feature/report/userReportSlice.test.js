import reducer, {
    userReportRead,
    readUserReport,
    createUserReport,
} from './userReportSlice';
import request from '../../utils/request';
import configureStore from '../../configureStore';

const { store } = configureStore();

describe('userReportSlice', () => {
    describe('reducers', () => {
        const initialState = {};

        it('sets the userReportRead payload', () => {
            const action = {
                type: userReportRead,
                payload: {
                    id: 'id',
                    title: 'title',
                    author: 'author',
                    ml_prediction: 'ml_prediction',
                    ml_probability: 'ml_probability',
                    style_prediction: 'style_prediction',
                    style_probability: 'style_probability'
                }
            };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                id: 'id',
                title: 'title',
                author: 'author',
                ml_prediction: 'ml_prediction',
                ml_probability: 'ml_probability',
                style_prediction: 'style_prediction',
                style_probability: 'style_probability'
            });
        });
    });
    describe('actions', () => {
        beforeEach(async () => {
            request.get = jest.fn();
            request.post = jest.fn();
            request.put = jest.fn();
            request.delete = jest.fn();

            request.get.mockResolvedValue({ data: {} });
        });

        it('readUserReport', async () => {
            // const state = store.getState().problem.problemInputReducer;

            await store.dispatch(readUserReport());
            expect(request.get).toHaveBeenCalledWith('analysis/');

            // const result = {};
            // dbdata.data.forEach(input => {
            //     result[input.id] = input;
            // });
            // expect(state).toEqual(result);
        });

        it('createUserReport', async () => {
            // const state = store.getState().problem.problemInputReducer;

            await store.dispatch(createUserReport());
            expect(request.post).toHaveBeenCalledWith('analysis/');

            // const result = {};
            // dbdata.data.forEach(input => {
            //     result[input.id] = input;
            // });
            // expect(state).toEqual(result);
        });
    });
});
