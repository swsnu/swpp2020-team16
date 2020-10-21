import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import App from './App';
import * as serviceWorker from './serviceWorker';

import exampleReducer from './store/reducers/exampleData';

const rootReducer = combineReducers({
  example_redux: exampleReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}><App /></Provider>,
  document.getElementById('root'));

serviceWorker.unregister();
