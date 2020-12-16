/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';
import StyleGridComponent from '../../components/AnalysisResult/StyleGrid';

export default class StyleGrid extends React.Component {
  render() {
    return <StyleGridComponent />;
  }
}

StyleGrid.propTypes = {
  match: PropTypes.object.isRequired,
};
