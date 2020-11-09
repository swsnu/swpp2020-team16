import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import PropTypes from 'prop-types';

import Home from './containers/Home';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import Check from './containers/Check';
import Result from './containers/Result';
import MyTestResult from './containers/MyTestResult';

function App(props) {
  const { history } = props;
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin/" exact component={SignIn} />
        <Route path="/signup/" exact component={SignUp} />
        <Route path="/check/result" exact component={Result} />
        <Route path="/my/tests/results" exact component={MyTestResult} />
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
