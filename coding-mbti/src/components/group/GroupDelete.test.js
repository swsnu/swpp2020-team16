import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import GroupDelete from './GroupDelete';
import configureStore from '../../configureStore';

const theme = createMuiTheme();

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: jest.fn(),
    }),
}));

describe('GroupDelete', () => {
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
                        <GroupDelete isManager deleteGroup={deleteGroup} />
                    </AlertProvider>
                </ThemeProvider>
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
        const startButton = wrapper.find('#GroupDeleteStart').first();
        startButton.simulate('click');

        const deleteButton = wrapper.find('#GroupDelete').first();
        deleteButton.simulate('click');
        expect(deleteGroup).toHaveBeenCalled();

        expect(wrapper).toMatchSnapshot();
    });
});
