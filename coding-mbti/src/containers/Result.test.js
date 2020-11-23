import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import { Provider } from 'react-redux';

import Result from './Result';
import configureStore from '../configureStore';

const { store } = configureStore();

describe('<Result/>', () => {
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
        <Result />
      </Provider>
    );
    const wrapper = component.find('div');
    expect(wrapper.length).toBe(4);

  });
});
