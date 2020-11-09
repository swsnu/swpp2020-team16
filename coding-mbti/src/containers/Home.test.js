import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';

describe('<Home/>', () => {
  let home;

  beforeEach(() => {
    home = <Home />;
  });

  it('should render without any error', () => {
    const component = shallow(home);

    const wrapper = component.find('.phrase');
    expect(wrapper.length).toBe(1);
  });

  it('should be directed to test page when user click Gettest button', () => {
    delete window.location;
    window.location = { replace: jest.fn() };

    const component = shallow(home);
    const wrapper = component.find('#getTested');
    wrapper.simulate('click');
    expect(window.location.replace).toHaveBeenCalledTimes(1);
  });
});
