/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import * as actionCreators from '../../store/actions/exampleData';

class Name extends Component {
  componentDidMount() {
    this.props.onGetNames();
  }

  render() {
    const names = this.props.names.map((name) => <div>{name.name}</div>);
    return (<div>{names}</div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  onGetNames: () => dispatch(actionCreators.getNames()),
});

const mapStateToProps = (state) => ({
  names: state.example_redux.names,
});

Name.propTypes = {
  onGetNames: PropTypes.func,
  names: PropTypes.arrayOf(PropTypes.string),
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Name));
