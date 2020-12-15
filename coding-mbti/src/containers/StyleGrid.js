/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';
import StyleGridComponent from '../components/StyleGrid';

export default class StyleGrid extends React.Component {
  handleClick(pid, style) {
    window.location.replace(`../${pid}/${style}`);
  }

  render() {
    const { pid } = this.props.match.params;
    return <StyleGridComponent handleClick={(style) => this.handleClick(pid, style)} />;
  }
}

StyleGrid.propTypes = {
  match: PropTypes.object.isRequired,
};
