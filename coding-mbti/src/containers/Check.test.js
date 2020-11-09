import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import Check from './Check';
import { store, history } from '../store/store';

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
        <ConnectedRouter history={history}>
          <Check match={{ params: { pid: '1' } }} />
        </ConnectedRouter>
      </Provider>,
    );
    const wrapper = component.find('Showprob');
    expect(wrapper.length).toBe(1);
  });
});
