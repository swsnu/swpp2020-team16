import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import { Provider } from 'react-redux';
import Check from './Check';
import configureStore from '../configureStore';

const { store } = configureStore();

describe('<Check/>', () => {
  let mount;

  beforeAll(() => {
    mount = createMount();
  });
  afterAll(() => {
    mount.cleanUp();
  });

  it('should render withour any error', () => {
    const component = mount(
      <Provider store={store}>
        <Check match={{ params: { pid: '1' } }} />
      </Provider>,
    );
    const wrapper = component.find('Showprob');
    expect(wrapper.length).toBe(1);
  });
});
