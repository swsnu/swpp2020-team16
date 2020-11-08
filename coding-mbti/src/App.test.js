/* eslint-disable react/jsx-props-no-spreading */
/*  테스트들 제대로 안 되어 있음  */

import React from 'react';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createMount } from '@material-ui/core/test-utils';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { store, history } from './store/store';
import App from './App';

describe('App', () => {
  let app;
  let mount;
  beforeAll(() => {
    mount = createMount();
  });
  afterAll(() => {
    mount.cleanUp();
  });

  beforeEach(() => {
    const options = {
      // you can also just use 'bottom center'
      position: positions.BOTTOM_CENTER,
      timeout: 5000,
      offset: '30px',
      // you can also just use 'scale'
      transition: transitions.SCALE,
    };

    app = (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <AlertProvider template={AlertTemplate} {...options}>
            <App />
          </AlertProvider>
        </ConnectedRouter>
      </Provider>
    );
  });

  it('should render without error', () => {
    const wrapper = mount(app);
    expect(wrapper.find('App').length).toBe(1);
  });

  it('should route to test page with correct props', () => {
    const options = {
      // you can also just use 'bottom center'
      position: positions.BOTTOM_CENTER,
      timeout: 5000,
      offset: '30px',
      // you can also just use 'scale'
      transition: transitions.SCALE,
    };
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <AlertProvider template={AlertTemplate} {...options}>
            <App />
          </AlertProvider>
        </ConnectedRouter>
      </Provider>,
    );
    expect(wrapper.find('#console').length).toBe(1);
  });
});
