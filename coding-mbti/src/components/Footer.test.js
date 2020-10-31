import React from 'react';
import Footer from './Footer';
import { createMount } from '@material-ui/core/test-utils';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

describe('<Footerr/>', () => {
  let footer = <Footer />;
  let mount;

  beforeAll(() => {
    mount = createMount();
  });

  afterAll(() => {
    mount.cleanUp();
  });

  it('should render withour any error', () => {
    const component = mount(footer);
    const wrapper = component.find('footer');
    expect(wrapper.length).toBe(1);
  });
});
