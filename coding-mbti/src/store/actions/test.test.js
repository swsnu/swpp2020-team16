import { createMount } from '@material-ui/core/test-utils';
import * as actionCreators from './test';
import { store } from '../store';

describe('test ActionCreators', () => {
  let mount;

  beforeAll(() => {
    mount = createMount();
  });
  afterAll(() => {
    mount.cleanUp();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('putTestResult should accumulate test result correctly', () => {
    store.dispatch(
      actionCreators.putTestResult({ readability: 1, read_prop: 0.7 }),
    );
    const newState = store.getState();
    expect(newState.test).toEqual({ readability: 1, read_prop: 0.7 });
  });
});
