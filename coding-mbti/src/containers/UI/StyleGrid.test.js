import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import { Provider } from 'react-redux';
import StyleGrid from './StyleGrid';
import StyleGridComponent from '../../components/AnalysisResult/StyleGrid';

import configureStore from '../../configureStore';

const { store } = configureStore();

describe('<StyleGrid/> should', () => {
  describe('render', () => {
    let mount;
    let styleGrid;

    beforeAll(() => {
      mount = createMount();
    });

    beforeEach(() => {
      styleGrid = (
        <Provider store={store}>
          <StyleGrid />
        </Provider>
      );
    });

    afterAll(() => {
      mount.cleanUp();
    });

    it('StyleGrid itself', () => {
      /* WHEN */
      const mountedComponent = mount(styleGrid);
      const targetComponent = mountedComponent.find(StyleGridComponent);

      /* THEN */
      expect(targetComponent.length).toBe(1);
    });
  });
});
