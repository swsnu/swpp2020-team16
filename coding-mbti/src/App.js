import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import PropTypes from 'prop-types';

import Home from './containers/Home';
import ShowOtherCodersSolutions from './components/ShowOtherCodersSolutions';
import OtherSolution from './containers/OtherSolutions';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import Check from './containers/Check';
import Result from './containers/Result';
import MyTestResult from './containers/MyTestResult';
import AuthRoute from './HOC/AuthRoute';

function App(props) {
  const { history } = props;
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin/" component={SignIn} />
        <Route exact path="/signup/" component={SignUp} />
        <Route
          path="/check/:pid"
          exact
          render={(props) => <Check {...props} />}
        />
        <Route
          exact
          path="/check/result/:pid/:style"
          render={(props) => <OtherSolution {...props} />}
        />
        <Route
          exact
          path="/check/result/:pid"
          render={(props) => <ShowOtherCodersSolutions {...props} />}
        />
        <AuthRoute exact path="/check/result">
          <Result />
        </AuthRoute>
        re
        <AuthRoute exact path="/my/tests/results">
          <MyTestResult />
        </AuthRoute>
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
