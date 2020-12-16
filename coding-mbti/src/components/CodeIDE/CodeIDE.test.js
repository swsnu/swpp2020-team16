import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import AceEditor from 'react-ace';
import * as utils from '../brython/utils';

import SignDialog from './SignDialog';
import CodeIDEProceedDialog from './CodeIDEProceedDialog';
import CodeIDE from './CodeIDE';

describe('<CodeIDE/> should', () => {
  const runCodeWithFilesSpy = jest.fn();
  jest.spyOn(utils, 'initBrythonRunner').mockImplementation(() => ({
    runCodeWithFiles: runCodeWithFilesSpy
  }));
  describe('render', () => {
    let mount;
    let mountingComponent;
    let mountedComponent;
    let props;

    beforeAll(() => {
      mount = createMount();
    });

    beforeEach(() => {
      props = {
        signedIn: true,
        pid: 1,
        handleSubmit: jest.fn(),
        problemInputs: ['p1 input 1', 'p1 input 2'],
        problemOutputs: ['p1 output 1', 'p1 output 2']
      };
      mountingComponent = <CodeIDE {...props} />;
      mountedComponent = mount(mountingComponent);
    });

    afterAll(() => {
      mount.cleanUp();
    });

    it('CodeIDE itself', () => {
      /* WHEN */
      const targetComponent = mountedComponent.find(CodeIDE);
      /* THEN */
      expect(targetComponent.length).toBe(1);
    });
    it('AceEditor', () => {
      /* WHEN */
      const targetComponent = mountedComponent.find(AceEditor);
      /* THEN */
      expect(targetComponent.length).toBe(1);
    });
    it('Console', () => {
      /* WHEN */
      const targetComponent = mountedComponent.find(TextareaAutosize);
      /* THEN */
      expect(targetComponent.length).toBe(1);
    });
    it('5 Buttons', () => {
      /* WHEN */
      const targetComponent = mountedComponent.find(Button);
      /* THEN */
      expect(targetComponent.length).toBe(5);
    });
  });
  describe('handle props', () => {
    let mount;
    let mountingComponent;
    let mountedComponent;
    let props;

    beforeAll(() => {
      mount = createMount();
    });

    beforeEach(() => {
      window.BrythonRunner = jest.fn();
    });

    afterAll(() => {
      mount.cleanUp();
    });

    it('initial props as expected', () => {
      /* WHEN */
      props = {
        signedIn: true,
        pid: 1,
        handleSubmit: jest.fn(),
        problemInputs: ['p1 input 1', 'p1 input 2'],
        problemOutputs: ['p1 output 1', 'p1 output 2']
      };
      mountingComponent = <CodeIDE {...props} />;
      mountedComponent = mount(mountingComponent);
      const targetComponent = mountedComponent.find(CodeIDE);

      /* THEN */
      expect(targetComponent.props().signedIn).toBe(props.signedIn);
      expect(targetComponent.props().pid).toEqual(props.pid);
      expect(targetComponent.props().handleSubmit).toEqual(props.handleSubmit);
      expect(targetComponent.props().problemInputs).toEqual(props.problemInputs);
      expect(targetComponent.props().problemOutputs).toEqual(props.problemOutputs);
    });
  });
  describe('handle useEffect', () => {
    let mount;
    let mountingComponent;
    let props;

    beforeAll(() => {
      mount = createMount();
    });

    beforeEach(() => {
      window.BrythonRunner = jest.fn();
    });

    afterAll(() => {
      mount.cleanUp();
    });

    it('useEffect as expected', () => {
      /* WHEN */
      props = {
        signedIn: true,
        pid: 1,
        handleSubmit: jest.fn(),
        problemInputs: ['p1 input 1', 'p1 input 2'],
        problemOutputs: ['p1 output 1', 'p1 output 2']
      };
      const useEffectSpy = jest.spyOn(React, 'useEffect');

      mountingComponent = <CodeIDE {...props} />;
      mount(mountingComponent);

      /* THEN */
      expect(useEffectSpy).toHaveBeenCalled();
    });
  });
  describe('handle events', () => {
    let mount;
    let mountingComponent;
    let mountedComponent;
    let props;
    let readAsTextSpy;

    beforeAll(() => {
      mount = createMount();
    });

    beforeEach(() => {
      readAsTextSpy = jest.fn();
      jest.spyOn(global, 'FileReader').mockImplementation(() => ({
        readAsText: readAsTextSpy,
        onLoad: jest.fn()
      }));

      props = {
        signedIn: true,
        pid: 1,
        handleSubmit: jest.fn(),
        problemInputs: ['p1 input 1', 'p1 input 2'],
        problemOutputs: ['p1 output 1', 'p1 output 2']
      };
      mountingComponent = <CodeIDE {...props} />;
      mountedComponent = mount(mountingComponent);
    });

    afterAll(() => {
      mount.cleanUp();
    });

    it('RUN click events', () => {
      /* WHEN */
      mountedComponent.find(Button).at(0).simulate('click');
      /* THEN */
      expect(runCodeWithFilesSpy).toHaveBeenCalled();
      expect(document.getElementById('output').value).toBe('');
    });
    it('TEST click events', () => {
      /* WHEN */
      mountedComponent.find(Button).at(1).simulate('click');
      /* THEN */
      expect(runCodeWithFilesSpy).toHaveBeenCalled();
      expect(document.getElementById('output').value).toBe('');
    });
    it('SUBMIT click events', () => {
      /* WHEN */
      document.getElementById('time-with-pass-count').value = '33 2';
      mountedComponent.find(Button).at(2).simulate('click');
      mountedComponent.update();
      /* THEN */
      expect(runCodeWithFilesSpy).toHaveBeenCalled();
      expect(mountedComponent.find(SignDialog).props().open).toBe(false);
      expect(mountedComponent.find(CodeIDEProceedDialog).props().open).toBe(false);
      expect(props.handleSubmit).not.toHaveBeenCalled();
      expect(document.getElementById('output').value).toBe('');
    });
    it('RESET click events', () => {
      /* WHEN */
      mountedComponent.find(Button).at(3).simulate('click');
      /* THEN */
      expect(document.getElementById('output').value).toBe('');
    });
    it('UPLOAD click events', () => {
      /* WHEN */
      mountedComponent.find('input').at(0).simulate('change');
      /* THEN */
      expect(readAsTextSpy).toHaveBeenCalled();
    });
    it('IDE write events', () => {
      /* WHEN */
      mountedComponent.find(AceEditor).simulate('change', { target: { value: 333 } });
    });
    it('onClose CodeIDEProceedDialog event', () => {
      /* WHEN */
      mountedComponent.find(CodeIDEProceedDialog).props().onClose();
    });
  });
  describe('handle etc', () => {
    let mount;
    let mountingComponent;
    let mountedComponent;
    let props;

    beforeAll(() => {
      mount = createMount();
    });

    beforeEach(() => {
      props = {
        signedIn: true,
        pid: 1,
        handleSubmit: jest.fn(),
        problemInputs: ['p1 input 1', 'p1 input 2'],
        problemOutputs: ['p1 output 1', 'p1 output 2']
      };
      mountingComponent = <CodeIDE {...props} />;
      mountedComponent = mount(mountingComponent);
    });

    afterAll(() => {
      mount.cleanUp();
    });

    it('onClose CodeIDEProceedDialog event', () => {
      /* WHEN */
      mountedComponent.find(CodeIDEProceedDialog).props().onClose();
    });
    it('proceedSumbit CodeIDEProceedDialog event', () => {
      /* WHEN */
      mountedComponent.find(CodeIDEProceedDialog).props().proceedSumbit();
    });
    it('onClose SignDialog event', () => {
      /* WHEN */
      mountedComponent.find(SignDialog).props().onClose();
    });
  });
});
