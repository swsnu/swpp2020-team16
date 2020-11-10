/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { Provider } from 'react-redux';
import { createMount } from '@material-ui/core/test-utils';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import AlertTemplate from 'react-alert-template-basic';
import App from './App';
import configureStore from './configureStore';

const { store } = configureStore();
const theme = createMuiTheme();

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
        <ThemeProvider theme={theme}>
          <AlertProvider template={AlertTemplate} {...options}>
            <App />
          </AlertProvider>
        </ThemeProvider>
      </Provider>
    );
  });

  it('should render without error', () => {
    const wrapper = mount(app);
    expect(wrapper.find('App').length).toBe(1);
  });

  it('should route to check page with correct props', () => {
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
        <ThemeProvider theme={theme}>
          <AlertProvider template={AlertTemplate} {...options}>
            <App />
          </AlertProvider>
        </ThemeProvider>
      </Provider>,
    );
    expect(wrapper.find('#console').length).toBe(1);
  });
});
