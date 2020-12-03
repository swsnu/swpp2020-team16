import React from 'react';

import { shallow } from 'enzyme';
import LoggedInHome from './LoggedInHome';

describe('<LoggedInHome/>', () => {
  let loggedInHome;

  beforeEach(() => {
    loggedInHome = <LoggedInHome />;
  });

  it('should render withour any error', () => {
    const component = shallow(loggedInHome);
    const wrapper = component.find('check');
    expect(wrapper.length).toBe(1);
  });
});
