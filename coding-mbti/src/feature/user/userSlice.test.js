import reducer, { readUsersByStyle, userReadByStyle } from './userSlice';
import request from '../../utils/request';
import configureStore from '../../configureStore';

describe('userSlice', () => {
  describe('reducers', () => {
    describe('should work well', () => {
      const initialState = {
        selectedUsers: [],
      };
      const payloadValue = [
        { user_id: 1, username: 'hello', style: 1 },
        { user_id: 2, username: 'hi', style: 1 },
      ];
      it('sets the state', () => {
        const action = {
          type: userReadByStyle,
          payload: payloadValue,
        };
        const state = reducer(initialState, action);
        expect(state.selectedUsers).toEqual(payloadValue);
      });
    });
  });
  describe('actions', () => {
    describe('readUsersByStyle', () => {
      let store;

      beforeEach(async () => {
        /* GIVEN */
        request.get = jest.fn();
        request.post = jest.fn();
        request.put = jest.fn();
        request.delete = jest.fn();
        store = configureStore().store;
      });

      it('should have good actionCreator readUserByStyle', async () => {
        request.get.mockResolvedValue({
          data: [
            { user_id: 1, username: 'hello', style: 1 },
            { user_id: 2, username: 'hi', style: 1 },
          ],
        });

        await store.dispatch(readUsersByStyle(1));

        /* THEN */
        expect(request.get).toHaveBeenCalledWith('user/1/');
      });

      it('should check validity of api response', async () => {
        request.get.mockResolvedValue({});

        try {
          await store.dispatch(readUsersByStyle(1));
        } catch (e) {
          expect(e.message).toBe('Key "data" does not exist.');
        }
      });

      it('should check validity of data of api response', async () => {
        request.get.mockResolvedValue({
          data: [
            { user_id: 1, username: 'hello' },
            { user_id: 2, username: 'hi' },
          ],
        });

        try {
          await store.dispatch(readUsersByStyle(1));
        } catch (e) {
          expect(e.message).toBe('Key "style" does not exist.');
        }
      });
    });
  });
});
