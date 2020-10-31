import { createStore } from 'redux';

import rootReducer from './reducer';
import middlewares from './middlewares';

const store = createStore(rootReducer, middlewares);

export default store;
