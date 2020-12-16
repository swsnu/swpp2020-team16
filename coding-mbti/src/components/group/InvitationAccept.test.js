import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import configureStore from '../../configureStore';
import InvitationAccept from './InvitationAccept';

const theme = createMuiTheme();

const { store } = configureStore();
const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE,
};
describe('GroupList', () => {
    let wrapper;
    const acceptInvitation = jest.fn();

    it('render', () => {
        wrapper = mount(
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <AlertProvider template={AlertTemplate} {...options}>
                        <InvitationAccept groups={{}} invitationId={1} acceptInvitation={acceptInvitation} />
                    </AlertProvider>
                </ThemeProvider>
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();

        wrapper.find('button').first().simulate('click');
        expect(acceptInvitation).toHaveBeenCalled();
    });
});
