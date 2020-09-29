import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import example_reducer from './store/reducers/example_data';

const rootReducer = combineReducers({
     example_redux: example_reducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}><App /></Provider>,
        document.getElementById('root'));

serviceWorker.unregister();
