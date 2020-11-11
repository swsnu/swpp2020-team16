import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Home from './Home';
import configureStore from '../configureStore';

const { store } = configureStore();
const theme = createMuiTheme();

describe('<Home/>', () => {
  let home;

  beforeEach(() => {
    const options = {
      // you can also just use 'bottom center'
      position: positions.BOTTOM_CENTER,
      timeout: 5000,
      offset: '30px',
      // you can also just use 'scale'
      transition: transitions.SCALE,
    };

    home =
      (
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <AlertProvider template={AlertTemplate} {...options}>
              <Home />
            </AlertProvider>
          </ThemeProvider>
        </Provider>
      );
  });

  it('should render without any error', () => {
    const component = mount(home);

    const wrapper = component.find('.phrase');
    expect(wrapper.length).toBe(3);
  });

  it('should be directed to test page when user click Gettest button', () => {
    delete window.location;
    window.location = { replace: jest.fn() };

    const component = mount(home);
    const wrapper = component.find('#getTested').first();
    wrapper.simulate('click');
    expect(window.location.replace).toHaveBeenCalledTimes(1);
  });
});
