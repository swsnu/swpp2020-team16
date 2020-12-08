import reducer, {
    invitationRead, invitationCreate, invitationDelete, invitationDeleteFail, invitationAccept, invitationAcceptFail, readInvitation, deleteInvitation, createInvitation, acceptInvitation
} from './groupInvitationSlice';
import request from '../../utils/request';
import invitationData from './responsesFromBackend/invitation.json';
import configureStore from '../../configureStore';
import { cloneObj } from '../../utils/testingUtils';

const { store } = configureStore();

describe('groupInvitationSlice', () => {
    it('invitationRead', () => {
        const initialState = {
            invitation: {},
            error: undefined,
        };

        const action = {
            type: invitationRead,
            payload: [{
                id: 1,
                sender: 1,
                receiver: 2,
                group: 1,
            }]
        };

        const state = reducer(initialState, action);
        expect(state.invitation).toEqual({ 1: action.payload[0] });
    });

    it('invitationCreate', () => {
        const initialState = {
            invitation: {},
            error: undefined,
        };

        const action = {
            type: invitationCreate,
            payload: {
                id: 1,
                sender: 1,
                receiver: 2,
                group: 1,
            }
        };

        const state = reducer(initialState, action);
        expect(state.invitation).toEqual({ 1: action.payload });
    });

    it('invitationDelete', () => {
        const initialState = {
            invitation: {
                1: {
                    id: 1,
                    sender: 1,
                    receiver: 2,
                    group: 1,
                }
            },
            error: undefined,
        };

        const action = {
            type: invitationDelete,
            payload: 1
        };

        const state = reducer(initialState, action);
        expect(state.invitation).toEqual({});
    });

    it('invitationDeleteFail', () => {
        const initialState = {
            invitation: {},
            error: undefined,
        };
        const action = {
            type: invitationDeleteFail,
            payload: 'Invitation delete fail'
        };

        const state = reducer(initialState, action);
        expect(state.error).toEqual(action.payload);
    });

    it('invitationAccept', () => {
        const initialState = {
            invitation: {
                1: {
                    id: 1,
                    sender: 1,
                    receiver: 2,
                    group: 1,
                }
            },
            error: undefined,
        };

        const action = {
            type: invitationAccept,
            payload: 1
        };

        const state = reducer(initialState, action);
        expect(state.invitation).toEqual({});
    });

    it('invitationAcceptFail', () => {
        const initialState = {
            invitation: {},
            error: undefined,
        };

        const action = {
            type: invitationAcceptFail,
            payload: 'Invitation accept fail'
        };

        const state = reducer(initialState, action);
        expect(state.error).toEqual(action.payload);
    });

    describe('actions', () => {
        describe('readInvitation', () => {
            describe('should handle response validity', () => {
                let invalidDataResponse;

                beforeEach(async () => {
                    /* GIVEN */
                    request.get = jest.fn();
                    request.post = jest.fn();
                    request.put = jest.fn();
                    request.delete = jest.fn();

                    invalidDataResponse = cloneObj(invitationData);
                });

                it('key `data` does not exist.', async () => {
                    /* WHEN */
                    delete invalidDataResponse.data;
                    request.get.mockResolvedValue({
                        ...invalidDataResponse
                    });

                    /* THEN */
                    try {
                        await store.dispatch(readInvitation());
                    } catch (e) {
                        expect(e.message).toBe('Key "data" does not exist.');
                    }
                });

                it('key `id` does not exist.', async () => {
                    /* WHEN */
                    delete invalidDataResponse.data[0].id;
                    request.get.mockResolvedValue({
                        ...invalidDataResponse
                    });

                    /* THEN */
                    try {
                        await store.dispatch(readInvitation());
                    } catch (e) {
                        expect(e.message).toBe('Key "id" does not exist.');
                    }
                });

                describe('should handle axios without error', () => {
                    beforeEach(async () => {
                        /* GIVEN */
                        request.get = jest.fn();
                        request.post = jest.fn();
                        request.put = jest.fn();
                        request.delete = jest.fn();
                    });

                    it('GET', async () => {
                        /* WHEN */
                        request.get.mockResolvedValue({
                            data: invitationData.data
                        });

                        await store.dispatch(readInvitation());

                        /* THEN */
                        expect(request.get).toHaveBeenCalledWith('group/invite/');
                    });
                });
            });
        });

        describe('createInvitation', () => {
            describe('should handle response validity', () => {
                let invalidDataResponse;

                beforeEach(async () => {
                    /* GIVEN */
                    request.get = jest.fn();
                    request.post = jest.fn();
                    request.put = jest.fn();
                    request.delete = jest.fn();

                    invalidDataResponse = cloneObj(invitationData);
                });

                it('key `data` does not exist.', async () => {
                    /* WHEN */
                    delete invalidDataResponse.data;
                    request.post.mockResolvedValue(invalidDataResponse);

                    /* THEN */
                    try {
                        await store.dispatch(createInvitation(invalidDataResponse.data));
                    } catch (e) {
                        expect(e.message).toBe('Key "data" does not exist.');
                    }
                });

                it('key `id` does not exist.', async () => {
                    /* WHEN */
                    delete invalidDataResponse.data[0].id;
                    request.post.mockResolvedValue(invalidDataResponse);

                    /* THEN */
                    try {
                        await store.dispatch(createInvitation(invitationData.data[0]));
                    } catch (e) {
                        expect(e.message).toBe('Key "id" does not exist.');
                    }
                });

                describe('should handle axios without error', () => {
                    beforeEach(async () => {
                        /* GIVEN */
                        request.get = jest.fn();
                        request.post = jest.fn();
                        request.put = jest.fn();
                        request.delete = jest.fn();
                    });

                    it('POST', async () => {
                        /* WHEN */
                        request.post.mockResolvedValue({
                            data: invitationData.data[0]
                        });

                        await store.dispatch(createInvitation(invitationData.data[0]));

                        /* THEN */
                        expect(request.post).toHaveBeenCalledWith('group/invite/', invitationData.data[0]);
                    });
                });
            });
        });

        describe('deleteInvitation', () => {
            describe('should handle axios without error', () => {
                beforeEach(async () => {
                    /* GIVEN */
                    request.get = jest.fn();
                    request.post = jest.fn();
                    request.put = jest.fn();
                    request.delete = jest.fn();
                });

                it('DELETE', async () => {
                    /* WHEN */
                    request.delete.mockResolvedValue({
                        status: 204
                    });

                    await store.dispatch(deleteInvitation(invitationData.data[0].id));

                    /* THEN */
                    expect(request.delete).toHaveBeenCalledWith(`group/invite/${invitationData.data[0].id}/`);
                });

                it('DELETE fail', async () => {
                    /* WHEN */
                    request.delete.mockResolvedValue({
                        status: 400
                    });

                    await store.dispatch(deleteInvitation(invitationData.data[0].id));

                    /* THEN */
                    expect(request.delete).toHaveBeenCalledWith(`group/invite/${invitationData.data[0].id}/`);

                    expect(store.getState().group.groupInvitationReducer.error).toEqual('Invitation delete fail');
                });
            });
        });

        describe('acceptInvitation', () => {
            describe('should handle response validity', () => {
                let invalidDataResponse;

                beforeEach(async () => {
                    /* GIVEN */
                    request.get = jest.fn();
                    request.post = jest.fn();
                    request.put = jest.fn();
                    request.delete = jest.fn();

                    invalidDataResponse = cloneObj(invitationData);
                });

                it('key `data` does not exist.', async () => {
                    /* WHEN */
                    delete invalidDataResponse.data;
                    request.get.mockResolvedValue({
                        ...invalidDataResponse
                    });

                    /* THEN */
                    try {
                        await store.dispatch(acceptInvitation(invalidDataResponse));
                    } catch (e) {
                        expect(e.message).toBe('Key "data" does not exist.');
                    }
                });

                describe('should handle axios without error', () => {
                    beforeEach(async () => {
                        /* GIVEN */
                        request.get = jest.fn();
                        request.post = jest.fn();
                        request.put = jest.fn();
                        request.delete = jest.fn();
                    });

                    it('GET', async () => {
                        /* WHEN */
                        request.get.mockResolvedValue({
                            status: 204
                        });

                        const { id } = invitationData.data[0];
                        await store.dispatch(acceptInvitation(id));

                        /* THEN */
                        expect(request.get).toHaveBeenCalledWith(`group/invite/accept/${id}`);
                    });

                    it('GET fail', async () => {
                        /* WHEN */
                        request.get.mockResolvedValue({
                            status: 400
                        });

                        const { id } = invitationData.data[0];
                        await store.dispatch(acceptInvitation(id));

                        /* THEN */
                        expect(request.get).toHaveBeenCalledWith(`group/invite/accept/${id}`);
                        expect(store.getState().group.groupInvitationReducer.error).toEqual('Invitation accept fail');
                    });
                });
            });
        });
    });
});
