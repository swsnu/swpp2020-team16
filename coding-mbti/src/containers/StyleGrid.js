/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';
import StyleGridComponent from '../components/StyleGrid';

export default class StyleGrid extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const { pid } = this.props.match.params;
    return (
      <StyleGridComponent
        handleClick={(style) => this.handleClick(pid, style)}
      />
    );
  }
}

StyleGrid.propTypes = {
  match: PropTypes.object.isRequired,
};
