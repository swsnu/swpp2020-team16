// import userlogin, { login, logIn } from './userSigninSlice';
// import request from '../../utils/request';
// import store from '../../configureStore';

// const testuser = {
//     email: 'test@test.com',
//     username: 'testusername',
// };
// describe('loginslice', () => {
//     beforeEach(() => {
//         console.error = jest.fn;
//     });
//     afterEach(() => {
//         jest.clearAllMocks();
//     });
//     it('should handle initial state', () => {
//         expect(userlogin(undefined, {})).toEqual({
//             loggedIn: undefined,
//             user: null,
//         });
//     });
//     it('should login works', () => {
//         expect(
//             userlogin(
//                 { loggedIn: undefined, user: null },
//                 { type: login.type, payload: testuser }
//             )
//         ).toEqual({ loggedIn: true, user: testuser });
//     });
//     /* it("should logIn works", () => {
//       const spy = jest.spyOn(request, "post").mockImplementation((url, atc) => {
//         return new Promise((resolve, reject) => {
//           const result = {
//             status: 204,
//           };
//           resulve(result);
//         });
//       });
//       store.dispatch(logIn(testuser)).then(() => {
//         expect(spy).toHaveBeenCalledTimes(1);
//         done();
//       });
//     });
//     it("should logIn not works with error", () => {
//       const spyError = jest
//         .spyOn(request, "post")
//         .mockImplementation((url, atc) => {
//           return new Promise((resolve, reject) => {
//             const result = {
//               status: 401,
//             };
//             reject(result);
//           });
//         });
//       store.dispatch(logIn(testuser)).then(() => {
//         expect(console.error).toHaveBeenCalledTimes(1);
//         done();
//       });
//     }); */
// });
