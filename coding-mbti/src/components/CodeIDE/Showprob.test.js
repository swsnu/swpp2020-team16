import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import Showprob from './Showprob';

const { store } = configureStore();

describe('<ShowProb/>', () => {
  let showprob;
  beforeEach(() => {
    showprob = <Provider store={store}><Showprob /></Provider>;
  });

  it('should render withour any error', () => {
    const component = mount(showprob);
    const wrapper = component.find('.showprob');
    expect(wrapper.length).toBe(3);
  });
});
