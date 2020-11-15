import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import { Provider } from 'react-redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import SignIn from './SignIn';
import configureStore from '../configureStore';

const { store } = configureStore();
const theme = createMuiTheme();
describe('<SignIn/>', () => {
  let mount;
  let signin;
  beforeEach(() => {
    const options = {
      position: positions.BOTTOM_CENTER,
      timeout: 5000,
      offset: '30px',
      transition: transitions.SCALE,
    };
    signin = (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <AlertProvider template={AlertTemplate} {...options}>
            <SignIn />
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
    const component = mount(signin);
    const wrapper = component.find('div');
    expect(wrapper.length).toBe(12);
  });
  it('should signin button click good', () => {
    const component = mount(signin);
    const wrapper = component.find('#sign_in_button').first();
    wrapper.simulate('click');
  });
  it('should email input change good', () => {
    const component = mount(signin);
    const wrapper = component.find('#email').first();
    wrapper.simulate('change', { target: { value: 'test@test.com' } });
  });
  it('should password input change good', () => {
    const component = mount(signin);
    const event = {
      target: { value: '123' },
    };
    const wrapper = component.find('#password').first();
    wrapper.simulate('change', event);
  });
});
