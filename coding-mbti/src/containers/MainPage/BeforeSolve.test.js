import React from 'react';

import { mount } from 'enzyme';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

import BeforeSolve from './BeforeSolve';

const theme = createMuiTheme();

describe('<BeforeSolve/>', () => {
  let beforeSolve;

  beforeEach(() => {
    beforeSolve = (
      <ThemeProvider theme={theme}>
        <BeforeSolve />
      </ThemeProvider>
    );
  });

  it('should render withour any error', () => {
    const component = mount(beforeSolve);
    const wrapper = component.find('.check');
    expect(wrapper.length).toBe(3);
  });

  it('should have good go to solve button', () => {
    const component = mount(beforeSolve);
    const wrapper = component.find('.goToSolve').at(0);
    wrapper.simulate('click');
  });
});
