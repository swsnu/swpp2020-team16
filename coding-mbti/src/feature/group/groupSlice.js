/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
import { createSlice } from '@reduxjs/toolkit';
import request from '../../utils/request';
import { InvalidKeyException } from '../../utils/exceptions';

const groupSlice = createSlice({
    name: 'group',
    initialState: {
        groups: {}, // only visible to manager
        members: {},
        error: null,
    },
    reducers: {
        groupRead: {
            reducer(state, action) {
                state.groups = {};
                action.payload.forEach(element => {
                    state.groups[element.id] = element;
                });
            },
        },
        groupReadFail: {
            reducer(state, action) {
                state.groups = {};
                state.error = action.payload;
            }
        },
        groupCreate: {
            reducer(state, action) {
                const { id } = action.payload;
                state.groups[id] = action.payload;
            }
        },
        groupCreateFail: {
            reducer(state, action) {
                state.error = action.payload;
            }
        },
        groupDelete: {
            reducer(state, action) {
                delete state.groups[action.payload];
            }
        },
        groupDeleteFail: {
            reducer(state, action) {
                state.error = action.payload;
            }
        },
        memberRead: {
            reducer(state, action) {
                state.members = {};
                action.payload.forEach(member => {
                    state.members[member.user_id] = member;
                });
            }
        },
        memberReadFail: {
            reducer(state, action) {
                state.members = {};
                state.error = action.payload;
            }
        },
        memberDelete: {
            reducer(state, action) {
                delete state.members[action.payload];
            }
        },
        memberDeleteFail: {
            reducer(state, action) {
                state.error = action.payload;
            }
        },
    },
});

export const {
    groupRead, groupReadFail, groupCreate, groupCreateFail, groupDelete, groupDeleteFail, memberRead, memberReadFail, memberDelete, memberDeleteFail,
} = groupSlice.actions;

export default groupSlice.reducer;

export const readGroup = () => async (dispatch) => {
    const res = await request.get('group/');
    const necessaryKeysInResponse = ['data'];
    try {
        necessaryKeysInResponse.map((key) => {
            if (!(key in res)) {
                throw new InvalidKeyException(`Key "${key}" does not exist.`);
            }
        });

        const necessaryKeysInResponseData = [
            'id', 'name', 'manager'];

        res.data.forEach(element => {
            necessaryKeysInResponseData.map(key => {
                if (!(key in element)) {
                    throw new InvalidKeyException(`Key "${key}" does not exist.`);
                }
            });
        });
    } catch (error) {
        dispatch(groupReadFail(error.message));
        return;
    }

    dispatch(groupRead(res.data));
};

export const createGroup = group => async dispatch => {
    try {
        const res = await request.post('group/', group);

        const necessaryKeysInResponse = ['data'];
        necessaryKeysInResponse.map((key) => {
            if (!(key in res)) {
                throw new InvalidKeyException(`Key "${key}" does not exist.`);
            }
        });

        const necessaryKeysInResponseData = [
            'id', 'name', 'manager'];

        necessaryKeysInResponseData.map(key => {
            if (!(key in res.data)) {
                throw new InvalidKeyException(`Key "${key}" does not exist.`);
            }
        });

        dispatch(groupCreate(res.data));
    } catch (error) {
        dispatch(groupCreateFail(error.message));
    }
};

export const deleteGroup = groupId => async dispatch => {
    const res = await request.delete(`group/${groupId}/`);
    if (res.status === 204) {
        dispatch(groupDelete(groupId));
    } else {
        dispatch(groupDeleteFail('Group delete Fail'));
    }
};

export const readMember = (groupId) => async dispatch => {
    const response = await request.get(`group/${groupId}/members/`);

    try {
        const necessaryKeysInResponse = ['data'];
        necessaryKeysInResponse.map((key) => {
            if (!(key in response)) {
                throw new InvalidKeyException(`Key "${key}" does not exist.`);
            }
        });

        response.data.forEach(res => {
            const necessaryKeysInResponseData = [
                'user_id', 'style', 'username', 'group'];

            necessaryKeysInResponseData.map(key => {
                if (!(key in res)) {
                    throw new InvalidKeyException(`Key "${key}" does not exist.`);
                }
            });
        });
    } catch (error) {
        dispatch(memberReadFail(error.message));
        return;
    }
    dispatch(memberRead(response.data));
};

export const deleteMember = (groupId, memberId) => async dispatch => {
    const res = await request.delete(`group/${groupId}/members/${memberId}/`);
    if (res.status === 204) {
        dispatch(memberDelete(memberId));
    } else {
        dispatch(memberDeleteFail('Member delete Fail'));
    }
};
