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
import Message from './containers/Message';
import Group from './containers/Group/Group';
import StyleGrid from './containers/StyleGrid';

/* Components */
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import GlobalReportMain from './containers/Research/GlobalReportMain';

function App(props) {
  const { history } = props;
  return (
    <Router history={history}>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin/" component={SignIn} />
        <Route exact path="/signup/" component={SignUp} />
        <Route exact path="/relation/" component={UserRelations} />
        <Route exact path="/messages/" component={Message} />
        <Route exact path="/research/api" component={ResearchAPI} />
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
          path="/home/"
          render={(props) => <LoggedInHome {...props} />}
        />
        <Route
          exact
          path="/beforesolve/"
          render={(props) => <BeforeSolve {...props} />}
        />
        <AuthRoute exact path="/solve">
          <Check />
        </AuthRoute>
        <AuthRoute exact path="/my/tests/results">
          <MyTestResult />
        </AuthRoute>
        <AuthRoute exact path="/group">
          <Group />
        </AuthRoute>
        <AuthRoute exact path="/invitation">
          <Invitation />
        </AuthRoute>
        <AuthRoute exact path="/researcher" component={GlobalReportMain} />
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
