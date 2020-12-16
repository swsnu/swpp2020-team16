import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import configureStore from '../../configureStore';
import OtherSolutions from './OtherSolutions';

const { store } = configureStore();
const theme = createMuiTheme();

describe('<OtherSolutions/>', () => {
  let otherSolutions;

  beforeEach(() => {
    const options = {
      // you can also just use 'bottom center'
      position: positions.BOTTOM_CENTER,
      timeout: 5000,
      offset: '30px',
      // you can also just use 'scale'
      transition: transitions.SCALE,
    };

    const mockReadSolutionOfOthers = jest.fn();
    const mockReadUsersByStyle = (a, b) => a + b;
    const mockUsers = { selectedUsers: [1, 2, 3] };
    otherSolutions = (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <AlertProvider template={AlertTemplate} {...options}>
            <OtherSolutions
              readSolutionOfOthers={mockReadSolutionOfOthers}
              readUsersByStyle={mockReadUsersByStyle}
              users={mockUsers}
              pid={1}
              match={{ params: { pid: '1' } }}
            />
          </AlertProvider>
        </ThemeProvider>
      </Provider>
    );
  });

  it('should render withour any error', () => {
    const component = mount(otherSolutions);
    const wrapper = component.find('#otherSolutions');
    expect(wrapper.length).toBe(3);
  });
});
