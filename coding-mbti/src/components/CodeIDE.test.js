/* 아래 submit버튼에 대한 테스트들 제대로 안 되어 있음  */
import { createMount } from '@material-ui/core/test-utils';
import CodeIDE from './CodeIDE';
// import request from '../utils/request';
import appWrappers from '../appWrappers';

describe('<CodeIDE/>', () => {
  describe('should render without any error for the following each props cases', () => {
    let mount;
    let testingComponent;
    let wrappedComponent;
    let mountedComponent;
    let target;

    const testCases = [
      {
        loggedIn: true,
        pid: 1,
        handleSubmit: () => { },
        problemInput: { test_cases: ['input string'] },
        problemOutput: { test_cases: ['output string'] },
      },
      {
        loggedIn: true,
        pid: 2,
        handleSubmit: () => { },
        problemInput: { test_cases: ['input string'] },
        problemOutput: { test_cases: ['output string'] },
      },
      {
        loggedIn: false,
        pid: 1,
        handleSubmit: () => { },
        problemInput: { test_cases: ['input string'] },
        problemOutput: { test_cases: ['output string'] },
      },
      {
        loggedIn: false,
        pid: 2,
        handleSubmit: () => { },
        problemInput: { test_cases: ['input string'] },
        problemOutput: { test_cases: ['output string'] },
      },
    ];

    beforeAll(() => {
      mount = createMount();
    });

    testCases.forEach(caseProps => {
      beforeEach(() => {
        /* GIVEN - general */
        testingComponent = CodeIDE;
        wrappedComponent = appWrappers(testingComponent, caseProps);
      });

      it(`if props are login[${caseProps.loggedIn}], pid[${caseProps.pid}] with valid handleSubmit function`, () => {
        /* GIVEN - specific */
        mountedComponent = mount(wrappedComponent);

        /* WHEN */
        target = mountedComponent.find('ReactAce').exists();

        /* THEN */
        expect(target).toBeTruthy();
      });
    });
  });

  describe('should handle onCodeChange, onTest, and onSubmit for logged-in user', () => {
    let mount;
    let testingComponent;
    let wrappedComponent;
    let mountedComponent;

    const mockHandleSubmit = jest.fn();
    const testCases = [
      {
        loggedIn: true,
        pid: 1,
        handleSubmit: mockHandleSubmit,
        problemInput: { test_cases: ['input string'] },
        problemOutput: { test_cases: ['output string'] },
      },
      {
        loggedIn: true,
        pid: 2,
        handleSubmit: mockHandleSubmit,
        problemInput: { test_cases: ['input string'] },
        problemOutput: { test_cases: ['output string'] },
      },
      {
        loggedIn: false,
        pid: 1,
        handleSubmit: mockHandleSubmit,
        problemInput: { test_cases: ['input string'] },
        problemOutput: { test_cases: ['output string'] },
      },
      {
        loggedIn: false,
        pid: 2,
        handleSubmit: mockHandleSubmit,
        problemInput: { test_cases: ['input string'] },
        problemOutput: { test_cases: ['output string'] },
      },
    ];

    beforeAll(() => {
      mount = createMount();
    });

    testCases.forEach(caseProps => {
      beforeEach(() => {
        /* GIVEN - general */
        mockHandleSubmit.mockClear();
        testingComponent = CodeIDE;
        wrappedComponent = appWrappers(testingComponent, caseProps);
      });

      it('onSubmit function with `elapsed-time` value equals null.', () => {
        /* GIVEN */
        mountedComponent = mount(wrappedComponent);

        /* WHEN */
        document.getElementById('elapsed-time').value = null;
        mountedComponent.find('button').find('#submit').simulate('click');

        /* THEN */
        //
      });

      it('onSubmit function with `elapsed-time` value equals not null.', () => {
        /* GIVEN */
        mountedComponent = mount(wrappedComponent);

        /* WHEN */
        document.getElementById('elapsed-time').value = 100;
        mountedComponent.find('button').find('#submit').simulate('click');

        /* THEN */
        //
      });

      // it('onCodeChange function.', () => {
      //   /* GIVEN */
      //   mountedComponent = mount(wrappedComponent);

      //   /* WHEN */
      //   document.getElementById('elapsed-time').value = 100;
      //   mountedComponent.find('button').find('#submit').simulate('click');

      //   /* THEN */
      //   if (caseProps.loggedIn === true) {
      //     expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
      //   } else {
      //     expect(global.alert).toHaveBeenCalledTimes(1);
      //   }
      // });
    });
  });

  // describe('should handle onCodeChange, onTest, and onSubmit for logged-in user', () => {
  //   const mockHandleSubmit = jest.fn().mockImplementation(() => () => { });
  //   let mount;
  //   let testingProps;
  //   let testingComponent;
  //   let wrappedComponent;
  //   let mountedComponent;
  //   let target;

  //   beforeAll(() => {
  //     mount = createMount();
  //   });

  //   beforeEach(() => {
  //     testingProps = {
  //       loggedIn: true,
  //       pid: 1,
  //       handleSubmit: mockHandleSubmit,
  //       problemInput: { test_cases: ['input string'] },
  //       problemOutput: { test_cases: ['output string'] },
  //     };
  //     testingComponent = CodeIDE;
  //     wrappedComponent = appWrappers(testingComponent, testingProps);
  //   });

  //   it('onSubmit function.', () => {
  //     /* GIVEN */
  //     mountedComponent = mount(wrappedComponent);

  //     /* WHEN */
  //     mountedComponent.find('#submit').simulate('click');
  //     // target = mountedComponent.find('CodeIDE').state();
  //     // console.log(target);

  //     /* THEN */
  //     expect(mockOnPutTestResult).toHaveBeenCalledTimes(0);
  //   });
  // });

  // it('should be directed correct test page before 5 submit', () => {
  //   const mockOnPutTestResult = jest.fn().mockImplementation(() => () => { });
  //   const spyAxios = jest.spyOn(request, 'post').mockImplementation(
  //     () => new Promise((resolve) => {
  //       const result = {
  //         status: 200,
  //         data: 'mock',
  //       };
  //       resolve(result);
  //     }),
  //   );
  //   const component = mount(
  //     <Provider store={store}>
  //       <CodeIDE pid="2" onPutTestResult={mockOnPutTestResult} />
  //     </Provider>,
  //   );

  //   let wrapper = component.find('button').at(1);

  //   wrapper.simulate('click');
  //   wrapper = component.find('#console');

  //   expect(wrapper.length).toBe(1);
  //   expect(spyAxios).toHaveBeenCalledTimes(1);
  //   expect(mockOnPutTestResult).toHaveBeenCalledTimes(0);
  // });
});
