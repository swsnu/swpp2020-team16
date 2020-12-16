import React from 'react';
import PropTypes from 'prop-types';
import {
  Route
} from 'react-router-dom';
import { connect } from 'react-redux';

function AuthRoute({ component: Component, ...rest }) {
  const { user } = rest;
  if (user.username === null) {
    return window.location.replace('/signin');
  }

  return (
    <Route
      {...rest}
      exact
      render={(props) => (
        <Component {...props} {...{ match: { params: rest.computedMatch.params } }} />
      )}
    />
  );
}

AuthRoute.propTypes = {
  component: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.userSignReducer,
});

export default connect(mapStateToProps, {})(AuthRoute);
