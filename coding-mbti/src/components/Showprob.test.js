import React from 'react';
import Showprob from './Showprob';
import { shallow } from 'enzyme';

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
