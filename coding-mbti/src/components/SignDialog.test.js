import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import ListItem from '@material-ui/core/ListItem';
import { Router } from 'react-router-dom';
import SignDialog from './SignDialog';

describe('<SignDialog/> should', () => {
  describe('render', () => {
    let mount;
    let signDialog;
    let props;

    beforeAll(() => {
      mount = createMount();
    });

    beforeEach(() => {
      props = {
        open: true,
        onClose: jest.fn(),
      };
      signDialog = <SignDialog {...props} />;
    });

    afterAll(() => {
      mount.cleanUp();
    });

    it('SignDialog itself', () => {
      /* WHEN */
      const mountedComponent = mount(signDialog);
      const targetComponent = mountedComponent.find('SignDialog');

      /* THEN */
      expect(targetComponent.length).toBe(1);
    });

    it('two ListItem', () => {
      /* WHEN */
      const mountedComponent = mount(signDialog);
      const targetComponent = mountedComponent.find(ListItem);

      /* THEN */
      expect(targetComponent.length).toBe(2);
    });
  });
  describe('handle props', () => {
    let mount;
    let signDialog;
    let props;

    beforeAll(() => {
      mount = createMount();
    });

    beforeEach(() => {
      props = {
        open: true,
        onClose: jest.fn(),
      };
      signDialog = <SignDialog {...props} />;
    });

    afterAll(() => {
      mount.cleanUp();
    });

    it('initial props as expected', () => {
      /* WHEN */
      const mountedComponent = mount(signDialog);
      const targetComponent = mountedComponent.find('SignDialog');

      /* THEN */
      expect(targetComponent.props().open).toBe(props.open);
      expect(targetComponent.props().onClose).toEqual(props.onClose);
    });
  });
  describe('handle events', () => {
    let mount;
    let signDialog;
    let props;
    let historyMock;

    beforeAll(() => {
      mount = createMount();
    });

    beforeEach(() => {
      props = {
        open: true,
        onClose: jest.fn(),
      };
      historyMock = {
        push: jest.fn(),
        location: {},
        listen: jest.fn()
      };
      signDialog = (
        <Router history={historyMock}>
          <SignDialog {...props} />
        </Router>
      );
    });

    afterAll(() => {
      mount.cleanUp();
    });

    it('signin click events', () => {
      /* WHEN */
      const mountedComponent = mount(signDialog);
      mountedComponent.find(ListItem).at(0).simulate('click');

      /* THEN */
      expect(historyMock.push).toHaveBeenCalled();
      expect(props.onClose).toHaveBeenCalled();
    });

    it('signup click events', () => {
      /* WHEN */
      const mountedComponent = mount(signDialog);
      mountedComponent.find(ListItem).at(1).simulate('click');

      /* THEN */
      expect(historyMock.push).toHaveBeenCalled();
      expect(props.onClose).toHaveBeenCalled();
    });
  });
});
