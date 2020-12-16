import { createMount } from '@material-ui/core/test-utils';
import SignUp from './SignUp';
import appWrappers from '../../appWrappers';

describe('<SignUp/>', () => {
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
      testingComponent = SignUp;
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

    const mockSignUp = jest.fn();
    const mockAlert = jest.fn();

    beforeAll(() => {
      mount = createMount();
    });
    afterAll(() => {
      mount.cleanUp();
    });
    beforeEach(() => {
      testingComponent = SignUp;
      testingProps = { signUp: mockSignUp, alert: mockAlert };
      wrappedComponent = appWrappers(testingComponent, testingProps);
    });

    it('SignUp', () => {
      /* GIVEN - specific */
      mountedComponent = mount(wrappedComponent).find('SignUp');

      /* WHEN */
      mountedComponent.find('#sign_up_button').hostNodes().simulate('click');

      /* THEN */
      // expect(spy).toHaveBeenCalledTimes(1);
    });

    it('alert', () => {
      /* GIVEN - specific */
      mountedComponent = mount(wrappedComponent).find('SignUp');

      /* WHEN */
      mountedComponent.find('#sign_up_button').hostNodes().simulate('click');

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
      testingComponent = SignUp;
      testingProps = {};
      wrappedComponent = appWrappers(testingComponent, testingProps);
    });

    it('username valid', () => {
      /* GIVEN - specific */
      mountedComponent = mount(wrappedComponent).find('SignUp');
      const spy = jest.spyOn(mountedComponent.instance(), 'validateUsername');

      /* WHEN */
      const mockedEvent = {
        preventDefault() { },
        target: { value: 'new username' }
      };
      const usernameInput = mountedComponent.find('#username').hostNodes();
      usernameInput.simulate('change', mockedEvent);

      /* THEN */
      expect(mountedComponent.state().username).toBe(mockedEvent.target.value);
      expect(mountedComponent.state().usernameValidation).toBe(true);
      expect(spy).toHaveBeenCalled();
    });

    it('username invalid', () => {
      /* GIVEN - specific */
      mountedComponent = mount(wrappedComponent).find('SignUp');
      const spy = jest.spyOn(mountedComponent.instance(), 'validateUsername');

      /* WHEN */
      const mockedEvent = {
        preventDefault() { },
        target: { value: 'under8' }
      };
      const usernameInput = mountedComponent.find('#username').hostNodes();
      usernameInput.simulate('change', mockedEvent);

      /* THEN */
      expect(mountedComponent.state().username).toBe(mockedEvent.target.value);
      expect(mountedComponent.state().usernameValidation).toBe(false);
      expect(spy).toHaveBeenCalled();
    });

    it('password valid', () => {
      /* GIVEN - specific */
      mountedComponent = mount(wrappedComponent).find('SignUp');
      const spy = jest.spyOn(mountedComponent.instance(), 'validatePassword');

      /* WHEN */
      const mockedEvent = {
        preventDefault() { },
        target: { value: 'new password' }
      };
      const passwordInput = mountedComponent.find('#password').hostNodes();
      passwordInput.simulate('change', mockedEvent);

      /* THEN */
      expect(mountedComponent.state().password).toBe(mockedEvent.target.value);
      expect(mountedComponent.state().passwordValidation).toBe(true);
      expect(spy).toHaveBeenCalled();
    });

    it('password invalid', () => {
      /* GIVEN - specific */
      mountedComponent = mount(wrappedComponent).find('SignUp');
      const spy = jest.spyOn(mountedComponent.instance(), 'validatePassword');

      /* WHEN */
      const mockedEvent = {
        preventDefault() { },
        target: { value: 'under8' }
      };
      const passwordInput = mountedComponent.find('#password').hostNodes();
      passwordInput.simulate('change', mockedEvent);

      /* THEN */
      expect(mountedComponent.state().password).toBe(mockedEvent.target.value);
      expect(mountedComponent.state().passwordValidation).toBe(false);
      expect(spy).toHaveBeenCalled();
    });
    it('passwordCheck valid', async () => {
      /* GIVEN - specific */
      mountedComponent = mount(wrappedComponent).find('SignUp');
      const spy = jest.spyOn(mountedComponent.instance(), 'validatePasswordCheck');

      /* WHEN */
      const mockedEvent = {
        preventDefault() { },
        target: { value: 'new passwordCheck' }
      };
      const passwordCheckInput = mountedComponent.find('#passwordCheck').hostNodes();
      await passwordCheckInput.simulate('change', mockedEvent);
      const passwordInput = mountedComponent.find('#password').hostNodes();
      await passwordInput.simulate('change', mockedEvent);

      /* THEN */
      expect(mountedComponent.state().password).toBe(mockedEvent.target.value);
      expect(mountedComponent.state().passwordCheck).toBe(mockedEvent.target.value);
      // expect(mountedComponent.state().passwordCheckValidation).toBe(true);
      expect(spy).toHaveBeenCalled();
    });
    it('passwordCheck invalid', () => {
      /* GIVEN - specific */
      mountedComponent = mount(wrappedComponent).find('SignUp');
      const spy = jest.spyOn(mountedComponent.instance(), 'validatePasswordCheck');

      /* WHEN */
      const mockedEvent = {
        preventDefault() { },
        target: { value: 'new passwordCheck' }
      };
      const passwordInput = mountedComponent.find('#passwordCheck').hostNodes();
      passwordInput.simulate('change', mockedEvent);

      /* THEN */
      expect(mountedComponent.state().passwordCheck).toBe(mockedEvent.target.value);
      expect(mountedComponent.state().passwordCheckValidation).toBe(false);
      expect(spy).toHaveBeenCalled();
    });
    it('email valid', () => {
      /* GIVEN - specific */
      mountedComponent = mount(wrappedComponent).find('SignUp');
      const spy = jest.spyOn(mountedComponent.instance(), 'validateEmail');

      /* WHEN */
      const mockedEvent = {
        preventDefault() { },
        target: { value: 'email@test.com' }
      };
      const emailInput = mountedComponent.find('#email').hostNodes();
      emailInput.simulate('change', mockedEvent);

      /* THEN */
      expect(mountedComponent.state().email).toBe(mockedEvent.target.value);
      expect(mountedComponent.state().emailValidation).toBe(true);
      expect(spy).toHaveBeenCalled();
    });
    it('email invalid', () => {
      /* GIVEN - specific */
      mountedComponent = mount(wrappedComponent).find('SignUp');
      const spy = jest.spyOn(mountedComponent.instance(), 'validateEmail');

      /* WHEN */
      const mockedEvent = {
        preventDefault() { },
        target: { value: 'new email' }
      };
      const emailInput = mountedComponent.find('#email').hostNodes();
      emailInput.simulate('change', mockedEvent);

      /* THEN */
      expect(mountedComponent.state().email).toBe(mockedEvent.target.value);
      expect(mountedComponent.state().emailValidation).toBe(false);
      expect(spy).toHaveBeenCalled();
    });
    it('role', () => {
      /* GIVEN - specific */
      mountedComponent = mount(wrappedComponent).find('SignUp');

      /* WHEN */
      const mockedEvent = {
        preventDefault() { },
        target: { value: 2 }
      };
      const roleInput = mountedComponent.find('ForwardRef(TextField)').find('#role').at(2);
      roleInput.simulate('click', mockedEvent);

      /* THEN */
      // expect(mountedComponent.state().role).toBe(mockedEvent.target.value);
    });
  });
});
