import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import GroupView from './GroupView';
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
describe('GroupView', () => {
    let wrapper;
    const createGroup = jest.fn();

    it('render', () => {
        wrapper = mount(
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <AlertProvider template={AlertTemplate} {...options}>
                        <GroupView groups={{ 1: { id: 1, name: 'text' } }} isManager gruopId={1} createGroup={createGroup} />
                    </AlertProvider>
                </ThemeProvider>
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
    });
});
