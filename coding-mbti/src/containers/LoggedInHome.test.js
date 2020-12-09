import React from 'react';

import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import configureMockStore from 'redux-mock-store';
import LoggedInHome from './LoggedInHome';

const theme = createMuiTheme();
const mockStore = configureMockStore();

describe('<LoggedInHome/>', () => {
  let loggedInHome;

  beforeEach(() => {
    let store = mockStore({
      report: {
        reportReducer: {
          myReport: {
            solutions: [
              { problem_id: '1', elapsed_time: 1, erase_cnt: 1, code: 'hi' },
            ],
          },
        },
      },
    });

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

  it('should be redirected to Solve page when there is no report', () => {
    const component = mount(loggedInHome);
    const wrapper = component.find('.buttton').at(0);
    wrapper.simulate('click');
  });

  it('should have goot go to next button', () => {
    let store = mockStore({
      report: {
        reportReducer: {
          myReport: {
            solutions: [
              { problem_id: '1', elapsed_time: 1, erase_cnt: 1, code: 'hi' },
            ],
          },
        },
      },
    });

    let loggedInHome = (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <LoggedInHome readMyReport={jest.fn().mockReturnValue(false)} />
        </ThemeProvider>
      </Provider>
    );
    const component = mount(loggedInHome);
    const wrapper = component.find('.buttton').at(0);
    wrapper.simulate('click');
  });
});
