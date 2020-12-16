import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

import UserRelations from './UserRelations';
import configureStore from '../configureStore';

const { store } = configureStore();
const theme = createMuiTheme();

describe('<UserRealtions/>', () => {
  const mockReadUsersByStyle = jest
    .fn()
    .mockImplementation(() => Promise.resolve('1', '2', '3'));
  const mockReadOtherReport = jest.fn();
  const mockReportReducer = {
    selectedUsers: ['1', '2', '3'],
    otherReport: {
      solutions: [
        { title: 'solution1', problem_id: 39 },
        { title: 'solution2', problem_id: 42 },
      ],
      report: { title: 'hi' },
    },
  };
  const userRelations = (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <UserRelations
          readOtherReport={mockReadOtherReport}
          readUsersByStyle={mockReadUsersByStyle}
          report={mockReportReducer}
        />
      </ThemeProvider>
    </Provider>
  );

  it('should render withour any error', () => {
    const component = mount(userRelations);
    const wrapper = component.find('.userRelations');
    expect(wrapper.length).toBe(3);
  });
});
