import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import PropTypes from 'prop-types';

import Home from './containers/Home';
import Check from './containers/Check';
import Result from './containers/Result';

function App(props) {
  const { history } = props;
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/check/result" exact component={Result} />
        <Route
          path="/check/:pid"
          exact
          render={(props) => <Check {...props} />}
        />
      </Switch>
    </Router>
  );
}

App.propTypes = {
  history: PropTypes.instanceOf(Object),
};
App.defaultProps = {
  history: {},
};
export default App;
