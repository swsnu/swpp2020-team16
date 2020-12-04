import React from 'react';

import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import configureStore from '../configureStore';
import MyTestResult from './MyTestResult';

const { store } = configureStore();
const theme = createMuiTheme();

describe('<MyTestResult/>', () => {
  let myTestResult;

  beforeEach(() => {
    myTestResult = (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MyTestResult />
        </ThemeProvider>
      </Provider>
    );
  });

  it('should render withour any error', () => {
    const component = mount(myTestResult);
    const wrapper = component.find('.check');
    expect(wrapper.length).toBe(3);
  });
});
