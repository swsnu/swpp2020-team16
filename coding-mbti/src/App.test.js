import React from 'react';
import { Provider } from 'react-redux';

import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { createBrowserHistory } from 'history';
import App from './App';
import store from './store/store';

configure({ adapter: new Adapter() });

const history = createBrowserHistory();

describe('App', () => {
  let app;

  beforeEach(() => {
    app = (
      <Provider store={store}>
        <App history={history} />
      </Provider>
    );
  });

  it('should render without error', () => {
    const wrapper = mount(app);
    expect(wrapper.find('App').length).toBe(1);
  });
});
