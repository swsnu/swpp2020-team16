import React from 'react';

import { shallow } from 'enzyme';
import MyTestResult from './MyTestResult';

describe('<MyTestResult/>', () => {
  let myTestResult;

  beforeEach(() => {
    myTestResult = <MyTestResult />;
  });

  it('should render withour any error', () => {
    const component = shallow(myTestResult);
    const wrapper = component.find('main');
    expect(wrapper.length).toBe(1);
  });
});
