import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import FindCodersByStyle from '../components/FindCodersByStyle';
import {
  readUsersByStyle,
  readOtherReport,
} from '../feature/report/reportSlice';

const sameStyle = 1;
const oppositeStyle = 16;

const styles = (theme) => ({
  Page: {
    backgroundColor: 'white',
    padding: theme.spacing(8, 12, 8),
    spacing: 8,
  },
});

class UserRelations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      same: [],
      opposite: [],
    };
  }

  async componentDidMount() {
    await this.props.readUsersByStyle(sameStyle);
    this.props.report.selectedUsers.forEach((el) => {
      this.state.same.push(el);
    });
    await this.props.readUsersByStyle(oppositeStyle);
    this.props.report.selectedUsers.forEach((el) => {
      this.state.opposite.push(el);
    });
    await this.props.readUsersByStyle(1);
  }

  render() {
    const { classes } = this.props;
    const { solutions, report } = this.props.report.otherReport;

    const solution1 =
      solutions.length === 0 ? { problem_id: '' } : solutions[0];
    const solution2 =
      solutions.length === 0 ? { problem_id: '' } : solutions[1];
    const reportt = report.length === 0 ? { title: '' } : report;

    return (
      <Grid container className={classes.Page} spacing={3} item xs={12}>
        <FindCodersByStyle
          same={this.state.same}
          opposite={this.state.opposite}
          readOtherReport={this.props.readOtherReport}
        />
        <Grid container spacing={3} className="userRelations" item xs={12}>
          <Grid item xs={1} />
          <Grid container spacing={3} item xs={10}>
            <Grid item xs={12}>
              <h1>{reportt.title}</h1>
            </Grid>

            <Grid container item xs={12}>
              {Object.entries(reportt).map(([key, value]) => (
                <>
                  <Grid>{key}</Grid>
                  <Grid>{JSON.stringify(value)}</Grid>
                </>
              ))}
            </Grid>
            <Grid item xs={12}>
              <h2>
                solution for
                {solution1.problem_id}
              </h2>
            </Grid>
            <Grid item xs={12}>
              <p>{JSON.stringify(solution1)}</p>
            </Grid>
            <Grid item xs={12}>
              <h2>
                solution for
                {solution2.problem_id}
              </h2>
            </Grid>
            <Grid item xs={12}>
              <p>{JSON.stringify(solution2)}</p>
            </Grid>
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </Grid>
    );
  }
}

UserRelations.propTypes = {
  readUsersByStyle: PropTypes.object.isRequired,
  readOtherReport: PropTypes.object.isRequired,
  report: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

UserRelations.defaultProps = {};

const mapDispatchToProps = (state) => ({
  report: state.report.reportReducer,
});

export default connect(mapDispatchToProps, {
  readUsersByStyle,
  readOtherReport,
})(withStyles(styles)(UserRelations));
