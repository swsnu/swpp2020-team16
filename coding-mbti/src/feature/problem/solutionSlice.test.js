import reducer, {
    solutionCreate,
    // solutionRead,
    // solutionDelete,
    readSolution,
    createSolution,
    deleteSolution
} from './solutionSlice';
import request from '../../utils/request';
import configureStore from '../../configureStore';
import dbdata from './solutionDB.json';

const { store } = configureStore();

describe('solutionSlice', () => {
    describe('reducers', () => {
        const initialState = [];

        // it('sets the solutionRead payload', () => {
        //     const action = {
        //         type: solutionRead,
        //         payload: [{
        //             id: 1,
        //             evaluation: 100,
        //             status: 1,
        //             content: 'a=input() b=input() print(a+b)'
        //         }]
        //     };

        //     const state = reducer(initialState, action);

        //     expect(state).toEqual({
        //         id: 1,
        //         evaluation: 100,
        //         status: 1,
        //         content: 'a=input() b=input() print(a+b)'
        //     });
        // });

        // it('sets the solutionDelete payload', () => {
        //     const action = {
        //         type: solutionDelete,
        //         payload: {
        //             id: '1'
        //         }
        //     };
        //     const state = reducer(initialState, action);
        //     expect(state).toEqual({
        //         id: 1,
        //     });
        // });

        it('sets the solutionCreate payload', () => {
            const action = {
                type: solutionCreate,
                payload: {
                    id: 1,
                    evaluation: 100,
                    status: 1,
                    content: 'a=input() b=input() print(a+b)'
                }
            };
            const state = reducer(initialState, action);
            expect(state).toEqual([{
                id: 1,
                evaluation: 100,
                status: 1,
                content: 'a=input() b=input() print(a+b)'
            }]);
        });
    });

    describe('actions', () => {
        const problemId = 1;
        const solution = {
            content: 'a=input() b=input() print(a+b)'
        };

        beforeEach(async () => {
            request.get = jest.fn();
            request.post = jest.fn();
            request.put = jest.fn();
            request.delete = jest.fn();

            request.get.mockResolvedValue({ data: dbdata.data });
            request.post.mockResolvedValue({ data: { id: 1 } });
        });

        it('readSolution', async () => {
            // const state = store.getState().problem.problemInputReducer;
            await store.dispatch(readSolution());
            expect(request.get).toHaveBeenCalledWith('problem/solution/');

            // const result = {};
            // dbdata.data.forEach(input => {
            //     result[input.id] = input;
            // });
            // expect(state).toEqual(result);
        });

        it('createSolution', async () => {
            // const state = store.getState().problem.problemInputReducer;
            await store.dispatch(createSolution(problemId, solution));
            expect(request.post).toHaveBeenCalledWith(
                `problem/${problemId}/solution/`,
                { content: 'a=input() b=input() print(a+b)' }
            );

            // const result = {};
            // dbdata.data.forEach(input => {
            //     result[input.id] = input;
            // });
            // expect(state).toEqual(result);
        });

        it('deleteSolution', async () => {
            // const state = store.getState().problem.problemInputReducer;
            await store.dispatch(deleteSolution(problemId));
            expect(request.delete).toHaveBeenCalledWith(`problem/solution/${problemId}`);

            // const result = {};
            // dbdata.data.forEach(input => {
            //     result[input.id] = input;
            // });
            // expect(state).toEqual(result);
        });
    });
});
