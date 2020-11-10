import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { PersistGate } from 'redux-persist/integration/react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import App from './App';
import configureStore from './configureStore';

const { store, persistor } = configureStore();
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

const theme = createMuiTheme();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AlertProvider template={AlertTemplate} {...options}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </AlertProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
