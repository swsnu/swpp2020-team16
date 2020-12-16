import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import BarSingleDiagram from './BarSingleDiagram';

describe('<BarSingleDiagram/>', () => {
  let barSingleDiagram;
  let shallow;
  const measures = {
    one: {
      name: 'Efficiency',
      data: [1, 2, 3, 4, 5, 6, 7],
    },
    another: {
      name: 'Readibility',
      data: [1, 2, 3, 4, 5, 6, 7],
    },
  };

  beforeAll(() => {
    shallow = createShallow();
  });

  afterAll(() => {
    shallow.cleanUp();
  });

  beforeEach(() => {
    barSingleDiagram = <BarSingleDiagram measures={measures} color={1} />;
  });

  it('should render without any error', () => {
    const theme = createMuiTheme();
    const component = shallow(
      <ThemeProvider theme={theme}>{barSingleDiagram}</ThemeProvider>,
    );
    const wrapper = component.find('BarSingleDiagram');
    expect(wrapper.length).toBe(1);
  });

  it('should receive props data without any error', () => {
    const theme = createMuiTheme();
    const component = shallow(
      <ThemeProvider theme={theme}>{barSingleDiagram}</ThemeProvider>,
    );
    const wrapper = component.find('BarSingleDiagram').dive().find('r');

    expect(wrapper.props().series[0].name).toEqual(measures.one.name);
    expect(wrapper.props().series[0].data).toEqual(measures.one.data);
    expect(wrapper.props().series[1].name).toEqual(measures.another.name);
    expect(wrapper.props().series[1].data).toEqual(measures.another.data);
  });
});
