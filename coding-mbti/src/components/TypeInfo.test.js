import React from 'react';
// import { shallow } from 'enzyme';

import { createShallow } from '@material-ui/core/test-utils';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TypeInfo from './TypeInfo';

describe('<TypeInfo/>', () => {
  let typeInfo;
  let shallow;
  const type = 'INTJ';

  beforeAll(() => {
    shallow = createShallow();
  });

  afterAll(() => {
    shallow.cleanUp();
  });

  beforeEach(() => {
    typeInfo = <TypeInfo type={type} />;
  });

  it('should render without any error', () => {
    const theme = createMuiTheme();
    const component = shallow(
      <ThemeProvider theme={theme}>{typeInfo}</ThemeProvider>,
    );
    const wrapper = component.find('TypeInfo').dive().find('Box');
    expect(wrapper.length).toBe(1);
  });

  it('should receive props data without any error', () => {
    const theme = createMuiTheme();
    const component = shallow(
      <ThemeProvider theme={theme}>{typeInfo}</ThemeProvider>,
    );
    const wrapper = component.find('TypeInfo');
    expect(wrapper.props().type).toEqual(type);
  });
});
