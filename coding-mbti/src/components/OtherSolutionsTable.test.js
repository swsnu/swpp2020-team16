import React from 'react';

import { shallow } from 'enzyme';
import OtherSolutionsTable from './OtherSolutionsTable';

describe('<otherSolutionsTable/>', () => {
  let otherSolutionsTable;

  beforeEach(() => {
    const mockSelectedUsers = [{ user_id: 1, user_name: 'hi', style: 1 }];
    const mockSelectedSolutions = [
      { erase_cnt: 1, elapsed_time: 1, code: 'hi' },
    ];
    otherSolutionsTable = (
      <OtherSolutionsTable
        selectedUsers={mockSelectedUsers}
        selectedSolutions={mockSelectedSolutions}
      />
    );
  });

  it('should render withour any error', () => {
    const component = shallow(otherSolutionsTable);
    const wrapper = component.find('.otherSolutionsTable');
    expect(wrapper.length).toBe(1);
  });

  it('should render modal when table cell clicked', () => {
    const component = shallow(otherSolutionsTable);
    const wrapper = component.find('.testRow');
    wrapper.simulate('click');
  });

  it('should turn off modal when anywhere is clicked', () => {
    const component = shallow(otherSolutionsTable);
    let wrapper = component.find('.testRow');
    wrapper.simulate('click');
    wrapper = component.find('.seeMore');
    wrapper.simulate('click');
  });
});
