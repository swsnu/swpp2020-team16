import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import CodeIDEforHome from './CodeIDEforHome';

describe('<CodeIDE/>', () => {
  let mount;

  beforeAll(() => {
    mount = createMount();
  });
  afterAll(() => {
    mount.cleanUp();
  });

  it('should render withour any error', () => {
    const options = {
      // you can also just use 'bottom center'
      position: positions.BOTTOM_CENTER,
      timeout: 5000,
      offset: '30px',
      // you can also just use 'scale'
      transition: transitions.SCALE,
    };
    const component = mount(
      <AlertProvider template={AlertTemplate} {...options}>
        <CodeIDEforHome />
      </AlertProvider>,
    );
    const wrapper = component.find('#console');
    expect(wrapper.length).toBe(1);
  });

  it('should show alert when user click submit', () => {
    const options = {
      // you can also just use 'bottom center'
      position: positions.BOTTOM_CENTER,
      timeout: 5000,
      offset: '30px',
      // you can also just use 'scale'
      transition: transitions.SCALE,
    };
    const component = mount(
      <AlertProvider template={AlertTemplate} {...options}>
        <CodeIDEforHome />
      </AlertProvider>,
    );
    const wrapper = component.find('button').at(1);
    wrapper.simulate('click');
  });
});
