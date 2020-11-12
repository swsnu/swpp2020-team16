import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  createUserReport,
  readUserReport,
} from '../feature/report/userReportSlice';

class Result extends Component {
  async componentDidMount() {
    await this.props.createUserReport();
    await this.props.readUserReport();
  }

  render() {
    console.log(this.props);
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
  reports: PropTypes.object,
};

Result.defaultProps = {
  reports: [],
};

const mapStateToProps = (state) => ({
  reports: state.report.userReportReducer,
});

export default connect(mapStateToProps, { createUserReport, readUserReport })(
  Result
);
