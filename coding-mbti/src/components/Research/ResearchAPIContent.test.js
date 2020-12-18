import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import ResearchAPIContent from './ResearchAPIContent';

describe('<ResearchAPIContent/> should', () => {
  describe('render', () => {
    let mount;
    let researchAPIContent;

    beforeAll(() => {
      mount = createMount();
    });

    beforeEach(() => {
      researchAPIContent = <ResearchAPIContent />;
    });

    afterAll(() => {
      mount.cleanUp();
    });

    it('ResearchAPIContent itself', () => {
      /* WHEN */
      const mountedComponent = mount(researchAPIContent);
      const targetComponent = mountedComponent.find(ResearchAPIContent);

      /* THEN */
      expect(targetComponent.length).toBe(1);
    });
  });
});
