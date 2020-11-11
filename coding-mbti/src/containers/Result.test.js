import React from 'react';

import { createShallow } from '@material-ui/core/test-utils';
import Result from './Result';

describe('<Result/>', () => {
  const result = <Result />;
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it('should render withour any error', () => {
    const component = shallow(result);
    const wrapper = component.find('h1');
    expect(wrapper.length).toBe(1);
  });
});
