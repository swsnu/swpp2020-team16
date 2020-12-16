import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import PropTypes from 'prop-types';

/* HOC */
import AuthRoute from './HOC/AuthRoute';

/* Containers */
import OtherSolution from './containers/AnalysisResult/OtherSolutions';
import UserRelations from './containers/AnalysisResult/UserRelations';
import SignIn from './containers/Auth/SignIn';
import SignUp from './containers/Auth/SignUp';
import Check from './containers/CodeIDE/Check';
import Home from './containers/MainPage/Home';
import MyTestResult from './containers/AnalysisResult/MyTestResult';
import ResearchAPI from './containers/Research/ResearchAPI';
import GroupDetail from './containers/Group/GroupDetail';
import LoggedInHome from './containers/MainPage/LoggedInHome';
import Invitation from './containers/Invitation/Invitation';
import BeforeSolve from './containers/MainPage/BeforeSolve';
import Group from './containers/Group/Group';
import Types from './containers/UI/Types';
import OtherTestResult from './containers/AnalysisResult/OtherTestResult';

/* Components */
import Navbar from './components/UI/Navbar';
import Footer from './components/UI/Footer';
import NotFound from './components/UI/NotFound';
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
        <Route exact path="/research/api" component={ResearchAPI} />
        <Route
          exact
          path="/check/result/:pid/:style"
          render={(props) => <OtherSolution {...props} />}
        />
        <Route
          exact
          path="/types/:style"
          render={(props) => <Types {...props} />}
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
        <Route
          exact
          path="/other/tests/results/:userid"
          render={(props) => <OtherTestResult {...props} />}
        />
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
