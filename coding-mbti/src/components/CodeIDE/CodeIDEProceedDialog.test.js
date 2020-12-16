import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import Button from '@material-ui/core/Button';
import CodeIDEProceedDialog from './CodeIDEProceedDialog';

describe('<CodeIDEProceedDialog/> should', () => {
  describe('render', () => {
    let mount;
    let mountingComponent;
    let props;

    beforeAll(() => {
      mount = createMount();
    });

    beforeEach(() => {
      props = {
        open: true,
        onClose: jest.fn(),
        proceedSumbit: jest.fn(),
      };
      mountingComponent = <CodeIDEProceedDialog {...props} />;
    });

    afterAll(() => {
      mount.cleanUp();
    });

    it('CodeIDEProceedDialog itself', () => {
      /* WHEN */
      const mountedComponent = mount(mountingComponent);
      const targetComponent = mountedComponent.find('CodeIDEProceedDialog');

      /* THEN */
      expect(targetComponent.length).toBe(1);
    });

    it('two Buttons', () => {
      /* WHEN */
      const mountedComponent = mount(mountingComponent);
      const targetComponent = mountedComponent.find(Button);

      /* THEN */
      expect(targetComponent.length).toBe(2);
    });
  });
  describe('handle props', () => {
    let mount;
    let mountingComponent;
    let props;

    beforeAll(() => {
      mount = createMount();
    });

    beforeEach(() => {
      props = {
        open: true,
        onClose: jest.fn(),
        proceedSumbit: jest.fn(),
      };
      mountingComponent = <CodeIDEProceedDialog {...props} />;
    });

    afterAll(() => {
      mount.cleanUp();
    });

    it('initial props as expected', () => {
      /* WHEN */
      const mountedComponent = mount(mountingComponent);
      const targetComponent = mountedComponent.find('CodeIDEProceedDialog');

      /* THEN */
      expect(targetComponent.props().open).toBe(props.open);
      expect(targetComponent.props().onClose).toEqual(props.onClose);
      expect(targetComponent.props().proceedSumbit).toEqual(props.proceedSumbit);
    });
  });
  describe('handle events', () => {
    let mount;
    let mountingComponent;
    let props;

    beforeAll(() => {
      mount = createMount();
    });

    beforeEach(() => {
      props = {
        open: true,
        onClose: jest.fn(),
        proceedSumbit: jest.fn(),
      };
      mountingComponent = <CodeIDEProceedDialog {...props} />;
    });

    afterAll(() => {
      mount.cleanUp();
    });

    it('fix click events', () => {
      /* WHEN */
      const mountedComponent = mount(mountingComponent);
      mountedComponent.find(Button).at(0).simulate('click');

      /* THEN */
      expect(props.onClose).toHaveBeenCalled();
    });

    it('proceed click events', () => {
      /* WHEN */
      const mountedComponent = mount(mountingComponent);
      mountedComponent.find(Button).at(1).simulate('click');

      /* THEN */
      expect(props.onClose).toHaveBeenCalled();
      expect(props.proceedSumbit).toHaveBeenCalled();
    });
  });
});
