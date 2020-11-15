import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import { Provider } from 'react-redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import SignUp from './SignUp';
import configureStore from '../configureStore';

const { store } = configureStore();
const theme = createMuiTheme();
describe('<SignUp/>', () => {
  let mount;
  let signup;
  beforeEach(() => {
    const options = {
      // you can also just use 'bottom center'
      position: positions.BOTTOM_CENTER,
      timeout: 5000,
      offset: '30px',
      // you can also just use 'scale'
      transition: transitions.SCALE,
    };
    signup = (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <AlertProvider template={AlertTemplate} {...options}>
            <SignUp />
          </AlertProvider>
        </ThemeProvider>
      </Provider>
    );
  });
  beforeAll(() => {
    mount = createMount();
  });
  afterAll(() => {
    mount.cleanUp();
  });
  it('should render without any error', () => {
    const component = mount(signup);
    const wrapper = component.find('div');
    expect(wrapper.length).toBe(24);
  });
  it('should signin button click good', () => {
    const component = mount(signup);
    const wrapper = component.find('#sign_up_button').first();
    wrapper.simulate('click');
  });
});
