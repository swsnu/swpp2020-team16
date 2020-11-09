import React from 'react';
import { shallow } from 'enzyme';
import SignIn from './SignIn';

describe('<SignIn/>', () => {
  let signin;

  beforeEach(() => {
    signin = <SignIn />;
  });

  it('should render without any error', () => {
    const component = shallow(signin);

    const wrapper = component.find('.signin');
    expect(wrapper.length).toBe(1);
  });

  it('should email input good', () => {
    const component = shallow(signin);
    const email = 'TEST_EMAIL';

    const emailWrapper = component.find('#email');
    emailWrapper.simulate('change', { target: { value: email } });
  });

  it('should password input good', () => {
    const component = shallow(signin);
    const password = 'TEST_PASSWORD';

    const passwordWrapper = component.find('#password');
    passwordWrapper.simulate('change', { target: { value: password } });
  });

  it('should signin button click good', () => {
    const component = shallow(signin);

    const buttonWrapper = component.find('#sign_in_button');
    buttonWrapper.simulate('click');
    // expect(spyHistoryPush).toHaveBeenCalledWith("/");
  });
});
