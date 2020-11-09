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
});
