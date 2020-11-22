import React from 'react';
import PropTypes from 'prop-types';
import {
  Route, Redirect
} from 'react-router-dom';

export default function AuthRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      exact
      render={(props) => (localStorage.getItem('token') !== null ?
        (
          <Component {...props} {...{ match: { params: rest.computedMatch.params } }} />
        ) :
        (
          <Redirect
            to={{ pathname: '/signin', state: { from: props.location } }}
          />
        ))}
    />
  );
}

AuthRoute.propTypes = {
  component: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};
