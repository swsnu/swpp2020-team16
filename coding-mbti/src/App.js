import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import PropTypes from 'prop-types';

/* HOC */
import AuthRoute from './HOC/AuthRoute';

/* Containers */
import OtherSolution from './containers/OtherSolutions';
import UserRelations from './containers/UserRelations';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import Check from './containers/Check';
import Home from './containers/Home';
import MyTestResult from './containers/MyTestResult';
import ResearchAPI from './containers/ResearchAPI';
import GroupDetail from './containers/Group/GroupDetail';
import LoggedInHome from './containers/LoggedInHome';
import Invitation from './containers/Invitation/Invitation';
import BeforeSolve from './containers/BeforeSolve';
import Group from './containers/Group/Group';
import StyleGrid from './containers/StyleGrid';
import Types from './containers/Types';
import OtherTestResult from './containers/OtherTestResult';

/* Components */
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotFound from './components/NotFound';

function App(props) {
  const { history } = props;
  return (
    <Router history={history}>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin/" component={SignIn} />
        <Route exact path="/signup/" component={SignUp} />
        <Route exact path="/types/:style" render={(props) => <Types {...props} />} />

        <AuthRoute exact path="/relation" component={UserRelations} />
        <AuthRoute exact path="/research/api" component={ResearchAPI} />
        <AuthRoute exact path="/home" component={LoggedInHome} />
        <AuthRoute exact path="/beforesolve" component={BeforeSolve} />
        <AuthRoute exact path="/solve" component={Check} />
        <AuthRoute exact path="/my/tests/results" component={MyTestResult} />
        <AuthRoute exact path="/group" component={Group} />
        <AuthRoute exact path="/invitation" component={Invitation} />

        <Route
          exact
          path="/check/result/:pid/:style"
          render={(props) => <OtherSolution {...props} />}
        />
        <Route
          exact
          path="/check/result/:pid"
          render={(props) => <StyleGrid {...props} />}
        />
        <Route
          exact
          path="/other/tests/results/:userid"
          render={(props) => <OtherTestResult {...props} />}
        />
        <Route
          exact
          path="/group/detail/:groupId"
          render={(props) => <GroupDetail {...props} />}
        />

        <Route path="*" exact component={NotFound} />
      </Switch>
      <Footer />
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
