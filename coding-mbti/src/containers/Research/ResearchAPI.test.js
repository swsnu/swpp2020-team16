import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import { Provider } from 'react-redux';
import ResearchAPI from './ResearchAPI';

import configureStore from '../../configureStore';

const { store } = configureStore();

describe('<ResearchAPI/> should', () => {
  describe('render', () => {
    let mount;
    let researchAPI;

    beforeAll(() => {
      mount = createMount();
    });

    beforeEach(() => {
      researchAPI = (
        <Provider store={store}>
          <ResearchAPI />
        </Provider>
      );
    });

    afterAll(() => {
      mount.cleanUp();
    });

    it('ResearchAPI itself', () => {
      /* WHEN */
      const mountedComponent = mount(researchAPI);
      const targetComponent = mountedComponent.find(ResearchAPI);

      /* THEN */
      expect(targetComponent.length).toBe(1);
    });
  });
});
