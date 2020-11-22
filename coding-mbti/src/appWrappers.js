import React from 'react';
import { Provider } from 'react-redux';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { PersistGate } from 'redux-persist/integration/react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import configureStore from './configureStore';

export default function appWrapper(TargetComponent, props) {
  const { store, persistor } = configureStore();

  const options = {
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE,
  };

  const theme = createMuiTheme();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AlertProvider template={AlertTemplate} {...options}>
          <ThemeProvider theme={theme}>
            <TargetComponent {...props} />
          </ThemeProvider>
        </AlertProvider>
      </PersistGate>
    </Provider>
  );
}
