import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Showprob from './Showprob';

const { store } = configureStore();

describe('<ShowProb/>', () => {
  let showprob;
  beforeEach(() => {
    showprob = <Provider store={store}><Showprob /></Provider>;
  });

  it('should render withour any error', () => {
    const component = shallow(showprob);
    const wrapper = component.find('.showprob');
    expect(wrapper.length).toBe(1);
  });
});
