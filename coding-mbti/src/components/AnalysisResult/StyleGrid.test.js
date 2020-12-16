import React from 'react';
import { Router } from 'react-router-dom';

import { mount } from 'enzyme';
import StyleGrid from './StyleGrid';

describe('<StyleGrid/>', () => {
  let styleGrid;

  beforeEach(() => {
    const mockMatch = { params: { pid: 1 } };
    const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

    styleGrid = (
      <Router history={historyMock}>
        <StyleGrid match={mockMatch} />
      </Router>
    );
  });

  it('should render withour any error', () => {
    const component = mount(styleGrid);
    const wrapper = component.find('.styleGrid');
    expect(wrapper.length).toBe(3);
  });
});
