import React from 'react';
import { mount } from 'enzyme';
import FindCodersByStyle from './FindCodersByStyle';

describe('<FindCodersByStyle/>', () => {
  const mockSame = [{ username: '1' }, { username: '2' }, { username: '3' }];
  const mockOpposite = [
    { username: '1' },
    { username: '2' },
    { username: '3' },
  ];
  const mockReadOtherReport = jest.fn().mockImplementation(() => {
    return new Promise((resolve) => {
      resolve({});
    });
  });
  const findCodersByStyle = (
    <FindCodersByStyle
      same={mockSame}
      opposite={mockOpposite}
      readOtherReport={mockReadOtherReport}
    />
  );

  it('should render withour any error', () => {
    const component = mount(findCodersByStyle);
    const wrapper = component.find('.findCoders');
    expect(wrapper.length).toBe(3);
  });

  it('should render detail user info when clicked', () => {
    const component = mount(findCodersByStyle);
    const wrapper = component.find('.forTest').at(2);
    wrapper.simulate('click');
    expect(mockReadOtherReport).toHaveBeenCalledTimes(1);
  });
});
