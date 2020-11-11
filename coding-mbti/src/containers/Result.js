import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { readProblemReport } from '../feature/report/problemReportSlice';

class Result extends Component {
  async componentDidMount() {
    await this.props.readProblemReport();
  }

  render() {
    const { reports } = this.props;
    return (
      <div>
        {Object.entries(reports).map(([key, value]) => (
          <div>
            {key}
            {JSON.stringify(value)}
          </div>
        ))}
      </div>
    );
  }
}

Result.propTypes = {
  readProblemReport: PropTypes.func.isRequired,
  reports: PropTypes.object,
};

Result.defaultProps = {
  reports: []
};

const mapStateToProps = state => ({
  reports: state.report.problemReportReducer,
});

export default connect(mapStateToProps, { readProblemReport })(Result);
