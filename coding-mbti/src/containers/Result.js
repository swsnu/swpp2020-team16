import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createMyReport, readMyReport } from '../feature/report/reportSlice';

class Result extends Component {
  async componentDidMount() {
    await this.props.createMyReport();
    await this.props.readMyReport();
  }

  render() {
    const { report } = this.props;
    return (
      <div>
        {Object.entries(report).map(([key, value]) => (
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
  report: PropTypes.object,
  createMyReport: PropTypes.func.isRequired,
  readMyReport: PropTypes.func.isRequired,
};

Result.defaultProps = {
  report: [],
};

const mapStateToProps = (state) => ({
  report: state.report.reportReducer,
});

export default connect(mapStateToProps, { createMyReport, readMyReport })(
  Result
);
