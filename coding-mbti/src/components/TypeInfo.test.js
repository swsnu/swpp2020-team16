import React from 'react';
import { mount } from 'enzyme';
import TypeInfo from './TypeInfo';

describe('<Profile />', () => {
  const validTestCases = [
    'UTRJ',
    'MTRJ',
    'UTRC',
    'MTRC',
    'UTTJ',
    'MTTJ',
    'UTTC',
    'MTTC',
    'UIRJ',
    'MIRJ',
    'UIRC',
    'MIRC',
    'UITJ',
    'MITJ',
    'UITC',
    'MITC',
  ];

  validTestCases.forEach((userType) => {
    it('matches snapshot', () => {
      const wrapper = mount(<TypeInfo type={userType} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
