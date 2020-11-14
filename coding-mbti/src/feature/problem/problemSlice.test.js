import reducer, {
    problemRead,
    readProblem
} from './problemSlice';
import request from '../../utils/request';
import configureStore from '../../configureStore';
import dbdata from './problemInputDB.json';

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
        };

        it('sets the payload', () => {
            const action = {
                type: problemRead,
                payload: {
                    desc: 'desc',
                    input_desc: 'input_desc',
                    output_desc: 'output_desc',
                    id: 'id',
                    title: 'title',
                    pid: 'pid',
                }
            };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                desc: 'desc',
                input_desc: 'input_desc',
                output_desc: 'output_desc',
                id: 'id',
                title: 'title',
                pid: 'pid',
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
            await store.dispatch(readProblem(problemId));
        });

        it('readProblem', () => {
            // const state = store.getState().problem.problemInputReducer;

            expect(request.get).toHaveBeenCalledWith(`problem/${problemId}/`);

            // const result = {};
            // dbdata.data.forEach(input => {
            //     result[input.id] = input;
            // });
            // expect(state).toEqual(result);
        });
    });
});
