import reducer, {
  signout,
  signin,
  signIn,
  signOut,
  signUp,
} from './userSignSlice';
import request from '../../utils/request';
import configureStore from '../../configureStore';
import dbdata from './responsesFromBackend/userSign.json';
import { cloneObj } from '../../utils/testingUtils';

describe('userSignSlice', () => {
  describe('reducers', () => {
    describe('signin', () => {
      const initialState = {
        username: null,
        token: null,
        role: null,
      };
      const payloadValue = {
        username: 'test username',
        token: 'test token',
        role: 1,
      };
      it('sets the state', () => {
        const action = {
          type: signin,
          payload: payloadValue
        };
        const state = reducer(initialState, action);
        expect(state).toEqual(payloadValue);
      });
    });
    describe('signout', () => {
      const initialState = {
        username: 'test username',
        token: 'test token',
        role: 1,
      };
      it('sets the state', () => {
        const action = {
          type: signout,
          payload: null,
        };
        const state = reducer(initialState, action);
        expect(state).toEqual({
          username: null,
          token: null,
          role: null,
        });
      });
    });
  });
  describe('actions', () => {
    describe('signIn', () => {
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
            request.post.mockResolvedValue({
              ...invalidDataResponse
            });

            /* THEN */
            try {
              await store.dispatch(signIn({
                username: 'test username',
                password: 'test password'
              }));
            } catch (e) {
              expect(e.message).toBe(`Key "${key}" does not exist.`);
            }
          });
        });
        const necessaryKeysInResponseData = ['token'];
        necessaryKeysInResponseData.forEach(key => {
          it(`key "${key}" does not exist.`, async () => {
            /* WHEN */
            delete invalidDataResponse.data[key];
            request.post.mockResolvedValue({
              ...invalidDataResponse
            });

            /* THEN */
            try {
              await store.dispatch(signIn({
                username: 'test username',
                password: 'test password'
              }));
            } catch (e) {
              expect(e.message).toBe(`Key "${key}" does not exist.`);
            }
          });
        });
      });
      describe('should handle non-2XX status code', () => {
        let store;
        beforeEach(async () => {
          /* GIVEN */
          request.get = jest.fn();
          request.post = jest.fn();
          request.put = jest.fn();
          request.delete = jest.fn();
          store = configureStore().store;
        });

        it('401', async () => {
          /* WHEN */
          request.post.mockResolvedValue({
            data: dbdata.data,
            status: 401
          });

          let errorMessage;
          try {
            await store.dispatch(signIn({
              username: 'test username',
              password: 'test password'
            }));
          } catch (error) {
            errorMessage = error.message;
          }

          /* THEN */
          expect(errorMessage).toBe('wrong username or password');
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
        it('POST', async () => {
          /* WHEN */
          request.post.mockResolvedValue({
            data: dbdata.data
          });
          await store.dispatch(signIn({
            username: 'test username',
            password: 'test password'
          }));
          /* THEN */
          expect(request.post).toHaveBeenCalledWith('/user/login/',
            {
              password: '0b47c69b1033498d5f33f5f7d97bb6a3126134751629f4d0185c115db44c094e',
              username: 'test username'
            });
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

        it('userSignReducer', async () => {
          /* WHEN */
          request.post.mockResolvedValue({
            data: dbdata.data
          });
          await store.dispatch(signIn({
            username: 'test username',
            password: 'test password'
          }));

          /* THEN */
          const state = store.getState().user.userSignReducer;
          expect(state).toEqual(dbdata.data);
        });
      });
    });
    describe('signOut', () => {
      describe('should handle response validity', () => { });
      describe('should handle non-2XX status code', () => {
        let store;
        beforeEach(async () => {
          /* GIVEN */
          request.get = jest.fn();
          request.post = jest.fn();
          request.put = jest.fn();
          request.delete = jest.fn();
          store = configureStore().store;
        });

        it('401', async () => {
          /* WHEN */
          request.get.mockResolvedValue({
            status: 401
          });
          let errorMessage;
          try {
            await store.dispatch(signOut());
          } catch (error) {
            errorMessage = error.message;
          }
          /* THEN */
          expect(errorMessage).toBe('username does not exist.');
        });
      });
      describe('should handle axios without error', () => {
        let store;
        beforeEach(async () => {
          /* GIVEN */
          request.get = jest.fn().mockResolvedValue({
            status: 200
          });
          request.post = jest.fn();
          request.put = jest.fn();
          request.delete = jest.fn();
          store = configureStore().store;
        });

        it('GET', async () => {
          /* WHEN */
          await store.dispatch(signOut());

          /* THEN */
          expect(request.get).toHaveBeenCalledWith('/user/logout/');
        });
      });
      describe('should handle reducer without error', () => {
        let store;
        beforeEach(async () => {
          /* GIVEN */
          request.get = jest.fn().mockResolvedValue({
            status: 200
          });
          request.post = jest.fn();
          request.put = jest.fn();
          request.delete = jest.fn();
          store = configureStore().store;
        });

        it('userSignReducer', async () => {
          /* WHEN */
          await store.dispatch(signOut({ token: 'test token' }));

          /* THEN */
          const state = store.getState().user.userSignReducer;
          expect(state).toEqual({ username: null, token: null, role: null });
        });
      });
    });
    describe('signUp', () => {
      describe('should handle response validity', () => { });
      describe('should handle non-2XX status code', () => {
        let store;
        beforeEach(async () => {
          /* GIVEN */
          request.get = jest.fn();
          request.post = jest.fn();
          request.put = jest.fn();
          request.delete = jest.fn();
          store = configureStore().store;
        });

        it('409', async () => {
          /* WHEN */
          request.post.mockResolvedValue({
            status: 409
          });

          let errorMessage;
          try {
            await store.dispatch(signUp(
              {
                username: 'test username',
                password: 'test password',
                role: 1,
                email: 'test email',
              }
            ));
          } catch (error) {
            errorMessage = error.message;
          }

          /* THEN */
          expect(errorMessage).toBe('username or email already exists');
        });
      });
      describe('should handle axios without error', () => {
        let store;
        beforeEach(async () => {
          /* GIVEN */
          request.get = jest.fn();
          request.post = jest.fn().mockResolvedValue({
            status: 200
          });
          request.put = jest.fn();
          request.delete = jest.fn();
          store = configureStore().store;
        });

        it('POST', async () => {
          /* WHEN */
          await store.dispatch(signUp(
            {
              username: 'test username',
              password: 'test password',
              role: 1,
              email: 'test email',
            }
          ));

          /* THEN */
          expect(request.post).toHaveBeenCalledWith('/user/signup/',
            {
              email: 'test email',
              password: '0b47c69b1033498d5f33f5f7d97bb6a3126134751629f4d0185c115db44c094e',
              role: 1,
              username: 'test username'
            });
        });
      });
      describe('should handle reducer without error', () => {
        let store;
        beforeEach(async () => {
          /* GIVEN */
          request.get = jest.fn();
          request.post = jest.fn().mockResolvedValue({
            status: 200
          });
          request.put = jest.fn();
          request.delete = jest.fn();
          store = configureStore().store;
        });

        it('userSignReducer', async () => {
          /* WHEN */
          await store.dispatch(signUp(
            {
              username: 'test username',
              password: 'test password',
              role: 1,
              email: 'test email',
            }
          ));

          /* THEN */
          const state = store.getState().user.userSignReducer;
          expect(state).toEqual({ username: null, token: null, role: null });
        });
      });
    });
  });
});
