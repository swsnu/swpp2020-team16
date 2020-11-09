import {
  createStore, combineReducers, compose, applyMiddleware,
} from 'redux';

import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import testReducer from './reducers/result';

export const history = createBrowserHistory();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const middlewares = [thunk, routerMiddleware(history)];

const rootReducer = combineReducers({
  test: testReducer,
  router: connectRouter(history),
});

export const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk, routerMiddleware(history))),
);
