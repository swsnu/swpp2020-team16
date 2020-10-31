import React from 'react';
import Home from './Home';
import { shallow } from 'enzyme';

describe('<Home/>', () => {
  let home;

  beforeEach(() => {
    home = <Home />;
  });

  it('should render withour any error', () => {
    const component = shallow(home);

    const wrapper = component.find('.phrase');
    expect(wrapper.length).toBe(1);
  });
});
