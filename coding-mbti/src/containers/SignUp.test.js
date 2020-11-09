import React from 'react';
import { shallow } from 'enzyme';
import SignUp from './SignUp';

describe('<SignUp/>', () => {
  let signup;

  beforeEach(() => {
    signup = <SignUp />;
  });

  it('should render without any error', () => {
    const component = shallow(signup);

    const wrapper = component.find('.signup');
    expect(wrapper.length).toBe(1);
  });

  it('should email input good', () => {
    const component = shallow(signup);
    const email = 'TEST_EMAIL';
    component.find('#email').simulate('change', { target: { value: email } });
  });

  it('should nickname input good', () => {
    const component = shallow(signup);
    const userName = 'TEST_NICKNAME';

    const usernameWrapper = component.find('#userName');
    usernameWrapper.simulate('change', { target: { value: userName } });
  });

  it('should password input good', () => {
    const component = shallow(signup);
    const password = 'TEST_PASSWORD';

    const passwordWrapper = component.find('#password');
    passwordWrapper.simulate('change', { target: { value: password } });
  });

  it('should password_check input good', () => {
    const component = shallow(signup);
    const passwordCheck = 'TEST_PASSWORD_CHECK';

    const passwordCheckWrapper = component.find('#passwordCheck');
    passwordCheckWrapper.simulate('change', {
      target: { value: passwordCheck },
    });
  });

  it('should user_type select good', () => {
    const component = shallow(signup);
    const userType = 'MANAGER';

    const userTypeWrapper = component.find('#userType');
    userTypeWrapper.simulate('change', { target: { value: userType } });
  });
});
