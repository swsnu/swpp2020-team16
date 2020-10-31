import React from 'react';
import { shallow } from 'enzyme';
import Showprob from './Showproblem';

describe('<ShowProb/>', () => {
  let showprob;
  beforeEach(() => {
    showprob = <Showprob />;
  });

  it('should render withour any error', () => {
    const component = shallow(showprob);
    const wrapper = component.find('.showprob');
    expect(wrapper.length).toBe(1);
  });
});
