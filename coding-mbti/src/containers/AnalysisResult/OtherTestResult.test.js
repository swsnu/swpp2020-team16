import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import configureStore from '../../configureStore';
import OtherTestResult from './OtherTestResult';

const { store } = configureStore();
const theme = createMuiTheme();

describe('<OtherTestResult/>', () => {
    let otherSolutions;

    beforeEach(() => {
        const options = {
            // you can also just use 'bottom center'
            position: positions.BOTTOM_CENTER,
            timeout: 5000,
            offset: '30px',
            // you can also just use 'scale'
            transition: transitions.SCALE,
        };

        otherSolutions = (
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <AlertProvider template={AlertTemplate} {...options}>
                        <OtherTestResult />
                    </AlertProvider>
                </ThemeProvider>
            </Provider>
        );
    });

    it('should render withour any error', () => {
        const component = mount(otherSolutions);
        expect(component).toMatchSnapshot();
    });
});
