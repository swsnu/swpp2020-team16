import React from 'react';
import Navbar from './Navbar';
import { createMount } from '@material-ui/core/test-utils';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { shallow } from 'enzyme';

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
      <ThemeProvider theme={theme}>{navbar}</ThemeProvider>
    );
    const wrapper = component.find('NavbarOMG');
    expect(wrapper.length).toBe(1);
  });

  it('should have good drawer button', () => {
    const spyDrawerButton = jest.spyOn(Navbar, 'toggleDrawer');

    const component = mount(navbar);
    console.log(component.debug());
    let wrapper = component.find('#drawerButton').at(1);
    wrapper.simulate('click');

    expect(spyDrawerButton).toHaveBeenCalledTimes(1);
  });
});
