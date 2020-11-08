import React from 'react';
import { shallow } from 'enzyme';
import Result from './Result';

describe('<Result/>', () => {
  let result;

  beforeEach(() => {
    result = <Result />;
  });

  it('should render withour any error', () => {
    const component = shallow(result);

    const wrapper = component.find('main');

    expect(wrapper.length).toBe(1);
  });
});
