/* 아래 submit버튼에 대한 테스트들 제대로 안 되어 있음  */
import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import { Provider } from 'react-redux';
import CodeIDE from './CodeIDE';
import request from '../utils/request';
import configureStore from '../configureStore';

const { store } = configureStore();

describe('<CodeIDE/>', () => {
  const codeIDE = (
    <Provider store={store}>
      <CodeIDE />
    </Provider>
  );
  let mount;

  beforeAll(() => {
    mount = createMount();
  });

  it('should render without any error', () => {
    const component = mount(codeIDE);
    const wrapper = component.find('#console');
    expect(wrapper.length).toBe(1);
  });

  it('should be directed correct test page before 5 submit', () => {
    const mockOnPutTestResult = jest.fn().mockImplementation(() => () => { });

    const spyAxios = jest.spyOn(request, 'post').mockImplementation(
      () => new Promise((resolve) => {
        const result = {
          status: 200,
          data: 'mock',
        };
        resolve(result);
      }),
    );

    const component = mount(
      <Provider store={store}>
        <CodeIDE pid="2" onPutTestResult={mockOnPutTestResult} />
      </Provider>,
    );

    let wrapper = component.find('button').at(1);

    wrapper.simulate('click');
    wrapper = component.find('#console');

    expect(wrapper.length).toBe(1);
    expect(spyAxios).toHaveBeenCalledTimes(1);
    expect(mockOnPutTestResult).toHaveBeenCalledTimes(0);
  });

  it('should be redirected result page after 5 submit', () => {
    const mockPush = jest.fn();
    const historyMock = { push: mockPush, replace: jest.fn() };

    const spyAxios = jest.spyOn(request, 'post').mockImplementation(
      () => new Promise((resolve) => {
        const result = {
          status: 200,
          data: 'mock',
        };
        resolve(result);
      }),
    );

    const component = mount(
      <Provider store={store}>
        <CodeIDE pid="5" history={historyMock} />
      </Provider>,
    );

    const wrapper = component.find('button[id="submit"]');
    wrapper.simulate('click');

    expect(mockPush).toHaveBeenCalledTimes(0);
    expect(spyAxios).toHaveBeenCalledTimes(2);
  });
});
