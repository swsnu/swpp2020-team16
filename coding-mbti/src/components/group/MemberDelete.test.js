import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import configureStore from '../../configureStore';
import MemberDelete from './MemberDelete';

const theme = createMuiTheme();

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: jest.fn(),
    }),
}));

describe('MemberDelete', () => {
    it('render', () => {
        const { store } = configureStore();
        const options = {
            // you can also just use 'bottom center'
            position: positions.BOTTOM_CENTER,
            timeout: 5000,
            offset: '30px',
            // you can also just use 'scale'
            transition: transitions.SCALE,
        };

        const deleteGroup = jest.fn();

        const wrapper = mount(
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <AlertProvider template={AlertTemplate} {...options}>
                        <MemberDelete isManager deleteMember={deleteGroup} />
                    </AlertProvider>
                </ThemeProvider>
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
        const startButton = wrapper.find('button').first();
        startButton.simulate('click');

        expect(wrapper).toMatchSnapshot();
    });
});
