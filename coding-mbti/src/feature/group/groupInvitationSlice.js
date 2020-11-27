/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
import { createSlice } from '@reduxjs/toolkit';
import request from '../../utils/request';
import { InvalidKeyException } from '../../utils/exceptions';

const groupInvitationSlice = createSlice({
    name: 'groupInvitation',
    initialState: {
        invitation: {},
        error: undefined,
    },
    reducers: {
        invitationRead: {
            reducer(state, action) {
                action.payload.forEach(element => {
                    state.invitation[element.id] = element;
                });
            },
        },
        invitationCreate: {
            reducer(state, action) {
                state.invitation[action.payload.id] = action.payload;
            }
        },
        invitationDelete: {
            reducer(state, action) {
                delete state.invitation[action.payload];
            }
        },
        invitationDeleteFail: {
            reducer(state, action) {
                state.error = action.payload;
            }
        },
        invitationAccept: {
            reducer(state, action) {
                delete state.invitation[action.payload];
            }
        },
        invitationAcceptFail: {
            reducer(state, action) {
                state.error = action.payload;
            }
        }
    },
});

export const {
    invitationRead, invitationCreate, invitationDelete, invitationDeleteFail, invitationAccept, invitationAcceptFail
} = groupInvitationSlice.actions;

export default groupInvitationSlice.reducer;

export const readInvitation = () => async dispatch => {
    const res = await request.get('group/invite/');

    const necessaryKeysInResponse = ['data'];

    necessaryKeysInResponse.map((key) => {
        if (!(key in res)) {
            throw new InvalidKeyException(`Key "${key}" does not exist.`);
        }
    });

    const necessaryKeysInResponseData = [
        'id', 'group', 'sender', 'receiver'];

    res.data.forEach(element => {
        necessaryKeysInResponseData.map(key => {
            if (!(key in element)) {
                throw new InvalidKeyException(`Key "${key}" does not exist.`);
            }
        });
    });
    dispatch(invitationRead(res.data));
};

export const createInvitation = (groupId, invitation) => async dispatch => {
    const res = await request.post(`group/${groupId}/invite/`, invitation);

    const necessaryKeysInResponse = ['data'];
    necessaryKeysInResponse.map((key) => {
        if (!(key in res)) {
            throw new InvalidKeyException(`Key "${key}" does not exist.`);
        }
    });

    const necessaryKeysInResponseData = [
        'id', 'group', 'sender', 'receiver'];

    necessaryKeysInResponseData.map(key => {
        if (!(key in res.data)) {
            throw new InvalidKeyException(`Key "${key}" does not exist.`);
        }
    });

    dispatch(invitationCreate(res.data));
    return res.data.id;
};

export const deleteInvitation = invitationId => async dispatch => {
    const res = await request.delete(`group/invite/${invitationId}/`);

    if (res.status === 204) {
        dispatch(invitationDelete(invitationId));
    } else {
        dispatch(invitationDeleteFail('Invitation delete fail'));
    }
};

export const acceptInvitation = invitationId => async dispatch => {
    const res = await request.get(`group/invite/accept/${invitationId}`);
    if (res.status === 204) {
        dispatch(invitationAccept(invitationId));
    } else {
        dispatch(invitationAcceptFail('Invitation accept fail'));
    }
};
