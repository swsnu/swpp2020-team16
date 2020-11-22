import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import RadarDiagram from './RadarDiagram';

describe('<RadarDiagram/>', () => {
  let radarDiagram;
  let shallow;
  const analysisData = [10, 20, 30, 40, 50, 60, 70, 80];

  beforeAll(() => {
    shallow = createShallow();
  });

  afterAll(() => {
    shallow.cleanUp();
  });

  beforeEach(() => {
    radarDiagram = <RadarDiagram analysisData={analysisData} />;
  });

  it('should render without any error', () => {
    const theme = createMuiTheme();
    const component = shallow(
      <ThemeProvider theme={theme}>{radarDiagram}</ThemeProvider>,
    );
    const wrapper = component.find('RadarDiagram');
    expect(wrapper.length).toBe(1);
  });

  it('should receive props data without any error', () => {
    const theme = createMuiTheme();
    const component = shallow(
      <ThemeProvider theme={theme}>{radarDiagram}</ThemeProvider>,
    );
    const wrapper = component.find('RadarDiagram').dive().find('r');
    expect(wrapper.props().series[0].data).toEqual(analysisData);
  });
});
