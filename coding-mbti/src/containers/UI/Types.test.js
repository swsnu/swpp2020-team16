/* eslint-disable react/style-prop-object */
import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import { Provider } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import Types from './Types';
import configureStore from '../../configureStore';

const { store } = configureStore();
const theme = createMuiTheme();

describe('<Types/> should', () => {
  describe('render', () => {
    let mount;
    let types;

    beforeAll(() => {
      mount = createMount();
    });

    beforeEach(() => {
      types = (
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Types style="UTRC" />
          </ThemeProvider>
        </Provider>
      );
    });

    afterAll(() => {
      mount.cleanUp();
    });

    it('Types itself', () => {
      /* WHEN */
      const mountedComponent = mount(types);
      const targetComponent = mountedComponent.find(Grid);

      /* THEN */
      expect(targetComponent.length).toBe(44);
    });
  });
});
