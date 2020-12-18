import reducer, {
    groupCreate, groupRead, groupDelete, groupDeleteFail, readGroup, memberRead, memberDelete, memberDeleteFail, createGroup, deleteGroup, deleteMember, readMember,
} from './groupSlice';
import request from '../../utils/request';
import groupData from './responsesFromBackend/group.json';
import memberData from './responsesFromBackend/member.json';
import configureStore from '../../configureStore';
import { cloneObj } from '../../utils/testingUtils';

const { store } = configureStore();

const groupInitialState = {
    groups: {},
    members: {},
    erorr: null
};

describe('groupSlice', () => {
    it('groupRead', () => {
        const initialState = groupInitialState;

        const action = {
            type: groupRead,
            payload: [{
                id: 1,
                name: 'test',
                manager: 1,
            }]
        };

        const state = reducer(initialState, action);
        expect(state.groups).toEqual({
            1: {
                id: 1,
                name: 'test',
                manager: 1,
            }
        });
    });

    it('groupCreate', () => {
        const initialState = groupInitialState;
        const action = {
            type: groupCreate,
            payload: {
                id: 1,
                name: 'test',
                manager: 1,
            }
        };

        const state = reducer(initialState, action);
        expect(state.groups).toEqual({
            1: {
                id: 1,
                name: 'test',
                manager: 1,
            }
        });
    });

    it('groupDelete', () => {
        const initialState = {
            groups: {
                1: {
                    id: 1,
                    name: 'test',
                    manager: 1,
                }
            },
            members: {},
            error: null,
        };
        const action = {
            type: groupDelete,
            payload: 1
        };

        const state = reducer(initialState, action);
        expect(state.groups).toEqual({});
    });

    it('groupDeleteFail', () => {
        const initialState = {
            groups: { id: undefined, name: undefined, manager: undefined },
            members: {},
            error: null,
        };
        const action = {
            type: groupDeleteFail,
            payload: undefined
        };

        const state = reducer(initialState, action);
        expect(state.groups).toEqual(initialState.groups);
    });

    it('memberRead', () => {
        const initialState = {
            groups: { id: undefined, name: undefined, manager: undefined },
            members: {},
            error: null,
        };

        const action = {
            type: memberRead,
            payload: [
                {
                    user_id: 1,
                    group: 1,
                    style: undefined
                }
            ]
        };

        const state = reducer(initialState, action);
        expect(state.members).toEqual({
            1: {
                user_id: 1,
                group: 1,
                style: undefined
            }
        });
    });

    it('memberDelete', () => {
        const initialState = {
            groups: { id: undefined, name: undefined, manager: undefined },
            members: {
                1: {
                    id: 1,
                    group: 1,
                    style: undefined
                }
            },
            error: null,
        };

        const action = {
            type: memberDelete,
            payload: 1
        };

        const state = reducer(initialState, action);
        expect(state.members).toEqual({});
    });

    it('memberDeleteFail', () => {
        const initialState = {
            groups: { id: undefined, name: undefined, manager: undefined },
            members: {
                1: {
                    id: 1,
                    group: 1,
                    style: undefined
                }
            },
            error: null,
        };

        const action = {
            type: memberDeleteFail,
            payload: 'Member delete fail'
        };

        const state = reducer(initialState, action);
        expect(state.error).toEqual('Member delete fail');
    });

    describe('actions', () => {
        describe('readGroup', () => {
            describe('should handle response validity', () => {
                let invalidDataResponse;

                beforeEach(async () => {
                    /* GIVEN */
                    request.get = jest.fn();
                    request.post = jest.fn();
                    request.put = jest.fn();
                    request.delete = jest.fn();

                    invalidDataResponse = cloneObj(groupData);
                });

                it('key `data` does not exist.', async () => {
                    /* WHEN */
                    delete invalidDataResponse.data;
                    request.get.mockResolvedValue({
                        ...invalidDataResponse
                    });

                    /* THEN */
                    await store.dispatch(readGroup());
                    expect(store.getState().group.groupReducer.error).toEqual('Key "data" does not exist.');
                });

                it('key `name` does not exist.', async () => {
                    /* WHEN */
                    delete invalidDataResponse.data[0].name;
                    request.get.mockResolvedValue({
                        ...invalidDataResponse
                    });

                    /* THEN */
                    await store.dispatch(readGroup());
                    expect(store.getState().group.groupReducer.error).toEqual('Key "name" does not exist.');
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
                            data: groupData.data
                        });

                        await store.dispatch(readGroup());

                        /* THEN */
                        expect(request.get).toHaveBeenCalledWith('group/');
                    });
                });
            });
        });

        describe('createGroup', () => {
            describe('should handle response validity', () => {
                let invalidDataResponse;

                beforeEach(async () => {
                    /* GIVEN */
                    request.get = jest.fn();
                    request.post = jest.fn();
                    request.put = jest.fn();
                    request.delete = jest.fn();

                    invalidDataResponse = cloneObj(groupData);
                });

                it('key `data` does not exist.', async () => {
                    /* WHEN */
                    delete invalidDataResponse.data;
                    request.post.mockResolvedValue(invalidDataResponse);

                    /* THEN */
                    await store.dispatch(createGroup(groupData.data));
                    expect(store.getState().group.groupReducer.error).toEqual('Key "data" does not exist.');
                });

                it('key `name` does not exist.', async () => {
                    /* WHEN */
                    delete invalidDataResponse.data.name;
                    request.post.mockResolvedValue(invalidDataResponse);

                    /* THEN */
                    try {
                        await store.dispatch(createGroup(groupData.data));
                    } catch (e) {
                        expect(e.message).toBe('Key "name" does not exist.');
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
                            data: groupData.data
                        });

                        await store.dispatch(createGroup(groupData.data));

                        /* THEN */
                        expect(request.post).toHaveBeenCalledWith('group/', groupData.data);
                    });
                });
            });
        });

        describe('deleteGroup', () => {
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

                    await store.dispatch(deleteGroup(groupData.data.id));

                    /* THEN */
                    expect(request.delete).toHaveBeenCalledWith(`group/${groupData.data.id}/`);
                });

                it('DELETE fail', async () => {
                    /* WHEN */
                    request.delete.mockResolvedValue({
                        status: 400
                    });

                    await store.dispatch(deleteGroup(groupData.data.id));

                    /* THEN */
                    expect(request.delete).toHaveBeenCalledWith(`group/${groupData.data.id}/`);

                    expect(store.getState().group.groupReducer.error).toEqual('Group delete Fail');
                });
            });
        });

        describe('readMember', () => {
            describe('should handle response validity', () => {
                let invalidDataResponse;

                beforeEach(async () => {
                    /* GIVEN */
                    request.get = jest.fn();
                    request.post = jest.fn();
                    request.put = jest.fn();
                    request.delete = jest.fn();

                    invalidDataResponse = cloneObj(memberData);
                });

                it('key `data` does not exist.', async () => {
                    /* WHEN */
                    delete invalidDataResponse.data;
                    request.get.mockResolvedValue({
                        ...invalidDataResponse
                    });

                    /* THEN */
                    try {
                        await store.dispatch(readMember());
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
                        await store.dispatch(readMember());
                    } catch (e) {
                        expect(e.message).toBe('Key "id" does not exist.');
                    }
                });

                it('key `style` does not exist.', async () => {
                    /* WHEN */
                    delete invalidDataResponse.data[0].style;
                    request.get.mockResolvedValue({
                        ...invalidDataResponse
                    });

                    /* THEN */
                    try {
                        await store.dispatch(readMember());
                    } catch (e) {
                        expect(e.message).toBe('Key "style" does not exist.');
                    }
                });

                it('key `manager` does not exist.', async () => {
                    /* WHEN */
                    delete invalidDataResponse.data[0].manager;
                    request.get.mockResolvedValue({
                        ...invalidDataResponse
                    });

                    /* THEN */
                    try {
                        await store.dispatch(readMember());
                    } catch (e) {
                        expect(e.message).toBe('Key "manager" does not exist.');
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
                            data: memberData.data
                        });

                        const { groupId } = memberData;

                        await store.dispatch(readMember(groupId));

                        /* THEN */
                        expect(request.get).toHaveBeenCalledWith(`group/${groupId}/members/`);
                    });
                });
            });
        });

        describe('deleteMember', () => {
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

                    const { groupId } = memberData;
                    await store.dispatch(deleteMember(groupId, memberData.data[0].id));

                    /* THEN */
                    expect(request.delete).toHaveBeenCalledWith(`group/${groupId}/members/${memberData.data[0].id}/`);
                });

                it('DELETE fail', async () => {
                    /* WHEN */
                    request.delete.mockResolvedValue({
                        status: 400
                    });

                    const { groupId } = memberData;
                    await store.dispatch(deleteMember(groupId, memberData.data[0].id));

                    /* THEN */
                    expect(request.delete).toHaveBeenCalledWith(`group/${groupId}/members/${memberData.data[0].id}/`);

                    expect(store.getState().group.groupReducer.error).toEqual('Member delete Fail');
                });
            });
        });
    });
});
