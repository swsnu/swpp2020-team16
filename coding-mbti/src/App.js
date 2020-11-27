import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import PropTypes from 'prop-types';

import Home from './containers/Home';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import Check from './containers/Check';
import MyTestResult from './containers/MyTestResult';
import AuthRoute from './HOC/AuthRoute';
import Group from './containers/Group/Group';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GroupDetail from './containers/Group/GroupDetail';

function App(props) {
  const { history } = props;
  return (
    <div>
      <Navbar />
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
          <AuthRoute exact path="/my/tests/results"><MyTestResult /></AuthRoute>
          <AuthRoute exact path="/group"><Group /></AuthRoute>
          <Route exact path="/group/detail/:groupId" render={(props) => <GroupDetail {...props} />} />
        </Switch>
      </Router>
      <Footer />
    </div >
  );
}

App.propTypes = {
  history: PropTypes.instanceOf(Object),
};
App.defaultProps = {
  history: {},
};
export default App;
