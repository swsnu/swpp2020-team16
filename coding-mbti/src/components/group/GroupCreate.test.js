import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import GroupCreate from './GroupCreate';
import configureStore from '../../configureStore';

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
describe('GroupCreate', () => {
    let wrapper;
    const createGroup = jest.fn();

    it('render', () => {
        wrapper = mount(
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <AlertProvider template={AlertTemplate} {...options}>
                        <GroupCreate isManager createGroup={createGroup} error={{}} />
                    </AlertProvider>
                </ThemeProvider>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
        const startButton = wrapper.find('#GroupCreateStart').first();
        startButton.simulate('click');

        const createButton = wrapper.find('#GroupCreate').first();
        createButton.simulate('click');
        expect(createGroup).not.toHaveBeenCalled();
    });

    it('no Manager', () => {
        wrapper = mount(
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <AlertProvider template={AlertTemplate} {...options}>
                        <GroupCreate isManager={false} createGroup={createGroup} error={{}} />
                    </AlertProvider>
                </ThemeProvider>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
});
