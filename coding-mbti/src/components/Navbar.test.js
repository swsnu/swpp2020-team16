import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import Navbar from './Navbar';
import configureStore from '../configureStore';

const { store } = configureStore();

describe('<Navbar/>', () => {
  let navbar;
  let mount;

  beforeAll(() => {
    mount = createMount();
  });

  afterAll(() => {
    mount.cleanUp();
  });

  beforeEach(() => {
    navbar = <Navbar />;
  });

  it('should render withour any error', () => {
    const theme = createMuiTheme();
    const component = mount(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {navbar}
        </ThemeProvider>
      </Provider>,
    );
    const wrapper = component.find('NavbarOMG');
    expect(wrapper.length).toBe(1);
  });

  it('should have good drawer button', () => {
    const theme = createMuiTheme();
    const component = mount(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {navbar}
        </ThemeProvider>
      </Provider>
    );
    const wrapper = component.find('#drawerButton').at(1);
    wrapper.simulate('click');
  });
});
