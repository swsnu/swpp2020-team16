import React from 'react';

import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import configureStore from '../configureStore';
import LoggedInHome from './LoggedInHome';

const { store } = configureStore();
const theme = createMuiTheme();

describe('<LoggedInHome/>', () => {
  let loggedInHome;

  beforeEach(() => {
    loggedInHome = (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <LoggedInHome />
        </ThemeProvider>
      </Provider>
    );
  });

  it('should render withour any error', () => {
    const component = mount(loggedInHome);
    const wrapper = component.find('.check');
    expect(wrapper.length).toBe(3);
  });
});
