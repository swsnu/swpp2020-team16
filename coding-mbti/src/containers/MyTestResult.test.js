import React from 'react';

import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import configureMockStore from 'redux-mock-store';
import MyTestResult from './MyTestResult';

const mockStore = configureMockStore();
const theme = createMuiTheme();

describe('<MyTestResult/>', () => {
  let myTestResult;

  beforeEach(() => {
    let store = mockStore({
      report: {
        reportReducer: {
          myReport: {
            solutions: [
              { problem_id: '1', elapsed_time: 1, erase_cnt: 1, code: 'hi' },
            ],
            report: {
              UM_prediction: 1,
              UM_probability: 0.5,
              JC_prediction: 1,
              TC_probability: 0.5,
              TI_prediction: 1,
              TI_probability: 0.5,
              RT_prediction: 1,
              RT_probability: 0.5,
            },
          },
        },
      },
    });

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

  it('should have good go button', () => {
    const component = mount(myTestResult);
    let wrapper = component.find('.bt').at(0);
    wrapper.simulate('click');
    wrapper = component.find('.bt').at(3);
    wrapper.simulate('click');
    wrapper = component.find('.bt').at(6);
    wrapper.simulate('click');
    wrapper = component.find('.bt').at(9);
    wrapper.simulate('click');
    wrapper = component.find('.bt').at(12);
    wrapper.simulate('click');
  });

  it('should render predictions& prob correctly', () => {
    let store = mockStore({
      report: {
        reportReducer: {
          myReport: {
            solutions: [
              { problem_id: '1', elapsed_time: 1, erase_cnt: 1, code: 'hi' },
            ],
            report: {
              UM_prediction: 0,
              UM_probability: 0.5,
              JC_prediction: 0,
              JC_probability: 0.5,
              TI_prediction: 0,
              TI_probability: 0.5,
              RT_prediction: 0,
              RT_probability: 0.5,
            },
          },
        },
      },
    });

    let myTestResult = (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MyTestResult />
        </ThemeProvider>
      </Provider>
    );

    const component = mount(myTestResult);
    const wrapper = component.find('.check');
    expect(wrapper.length).toBe(3);
  });

  it('should redirect to solve when there is no solutions', () => {
    let store = mockStore({
      report: {
        reportReducer: {
          myReport: {
            solutions: [],
            report: {},
          },
        },
      },
    });

    let myTestResult = (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MyTestResult />
        </ThemeProvider>
      </Provider>
    );

    const component = mount(myTestResult);
    const wrapper = component.find('.check');
    expect(wrapper.length).toBe(3);
  });
});

describe('<MyTestResult />', () => {
  const myTestResult = (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MyTestResult />
      </ThemeProvider>
    </Provider>
  );
  it('matches snapshot', () => {
    const wrapper = shallow(myTestResult);
    expect(wrapper).toMatchSnapshot();
  });
});
