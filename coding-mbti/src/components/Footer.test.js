import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import Footer from './Footer';

describe('<Footer/>', () => {
  const footer = <Footer />;
  let mount;

  beforeAll(() => {
    mount = createMount();
  });

  afterAll(() => {
    mount.cleanUp();
  });

  it('should render withour any error', () => {
    const component = mount(footer);
    const wrapper = component.find('footer');
    expect(wrapper.length).toBe(1);
  });
});
