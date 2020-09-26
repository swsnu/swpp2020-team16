import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

import * as actionTypes from '../../store/actions/actionTypes';
import * as actionCreators from '../../store/actions/example_data';

class Name extends Component {
  componentDidMount() {
    this.props.onGetNames();
  }

  render() {
    const names = this.props.names.map((name, index) =>  <div key={index}>{name.name}</div>)
  return (<div>{names}</div>)
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onGetNames: () => dispatch(actionCreators.getNames()),
  };
};

const mapStateToProps = state => {
  return {
    names: state.example_redux.names,
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Name));