import { createMount } from '@material-ui/core/test-utils';
import SignIn from './SignIn';
import appWrappers from '../appWrappers';

describe('<SignIn/>', () => {
  describe('should render core components', () => {
    let mount;
    let testingProps;
    let testingComponent;
    let wrappedComponent;
    let mountedComponent;
    let target;

    beforeAll(() => {
      mount = createMount();
    });
    afterAll(() => {
      mount.cleanUp();
    });
    beforeEach(() => {
      testingComponent = SignIn;
      testingProps = {};
      wrappedComponent = appWrappers(testingComponent, testingProps);
    });

    it('should render withour any error', () => {
      /* GIVEN - specific */
      mountedComponent = mount(wrappedComponent);

      /* WHEN */
      target = mountedComponent.exists();

      /* THEN */
      expect(target).toBeTruthy();
    });
  });
  describe('handler methods', () => {
    let mount;
    let testingProps;
    let testingComponent;
    let wrappedComponent;
    let mountedComponent;

    const mockSignIn = jest.fn();
    const mockAlert = jest.fn();

    beforeAll(() => {
      mount = createMount();
    });
    afterAll(() => {
      mount.cleanUp();
    });
    beforeEach(() => {
      testingComponent = SignIn;
      testingProps = { signIn: mockSignIn, alert: mockAlert };
      wrappedComponent = appWrappers(testingComponent, testingProps);
    });

    it('signIn', () => {
      /* GIVEN - specific */
      mountedComponent = mount(wrappedComponent).find('SignIn');

      /* WHEN */
      mountedComponent.find('#sign_in_button').hostNodes().simulate('click');

      /* THEN */
      // expect(spy).toHaveBeenCalledTimes(1);
    });

    it('alert', () => {
      /* GIVEN - specific */
      mountedComponent = mount(wrappedComponent).find('SignIn');

      /* WHEN */
      mountedComponent.find('#sign_in_button').hostNodes().simulate('click');

      /* THEN */
      // expect(mockSignIn).toHaveBeenCalledTimes(1);
    });
  });
  describe('should handle state changes', () => {
    let mount;
    let testingProps;
    let testingComponent;
    let wrappedComponent;
    let mountedComponent;

    beforeAll(() => {
      mount = createMount();
    });
    afterAll(() => {
      mount.cleanUp();
    });
    beforeEach(() => {
      testingComponent = SignIn;
      testingProps = {};
      wrappedComponent = appWrappers(testingComponent, testingProps);
    });

    it('username', () => {
      /* GIVEN - specific */
      mountedComponent = mount(wrappedComponent).find('SignIn');

      /* WHEN */
      const mockedEvent = {
        preventDefault() { },
        target: { value: 'new username' }
      };
      const usernameInput = mountedComponent.find('#inputUsername').hostNodes();
      usernameInput.simulate('change', mockedEvent);

      /* THEN */
      expect(mountedComponent.state().username).toBe(mockedEvent.target.value);
    });

    it('password', () => {
      /* GIVEN - specific */
      mountedComponent = mount(wrappedComponent).find('SignIn');

      /* WHEN */
      const mockedEvent = {
        preventDefault() { },
        target: { value: 'new password' }
      };
      const passwordInput = mountedComponent.find('#inputPassword').hostNodes();
      passwordInput.simulate('change', mockedEvent);

      /* THEN */
      expect(mountedComponent.state().password).toBe(mockedEvent.target.value);
    });
  });
});
