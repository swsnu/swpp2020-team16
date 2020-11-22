import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { readUsersByStyle } from '../feature/report/reportSlice';
import { readSolutionOfOthers } from '../feature/problem/solutionSlice';
import OtherSolutionsTable from '../components/OtherSolutionsTable';

const styleToIntDict = {
  UTEJ: 1,
  UTEC: 2,
  UTFJ: 3,
  UTFC: 4,
  UIEJ: 5,
  UIEC: 6,
  UIFJ: 7,
  UIFC: 8,
  MTEJ: 9,
  MTEC: 10,
  MTFJ: 11,
  MTFC: 12,
  MIEJ: 13,
  EIEC: 14,
  MIFJ: 15,
  MIFC: 16,
};
const styles = (theme) => ({
  Page: {
    backgroundColor: 'white',
    padding: theme.spacing(8, 0, 6),
  },
});

let styleInt = 1;
let pid = 1;

class OtherSolutions extends Component {
  async componentDidMount() {
    await this.props.readUsersByStyle(styleInt);
    await this.props.readSolutionOfOthers(this.props.report.selectedUsers, pid);
  }

  render() {
    const mapStyleToInt = (style) => styleToIntDict[style];
    const { classes } = this.props;
    styleInt = mapStyleToInt(this.props.match.params.style);
    const styleStr = this.props.match.params.style;
    pid = this.props.match.params.pid;
    const selectedUsers = this.props.report.selectedUsers
      ? this.props.report.selectedUsers
      : [];
    const selectedSolutions = this.props.solution.selectedSolutions
      ? this.props.solution.selectedSolutions
      : [];

    return (
      <Grid
        container
        className={classes.Page}
        id="otherSolutions"
        maxWidth="lg"
      >
        <Grid item align="center" xs={12}>
          <h1>{`solutions of ${styleStr} coders for problem ${pid}`}</h1>
        </Grid>
        <Grid item xs={2} />
        <Grid container item xs={8}>
          <OtherSolutionsTable
            selectedUsers={selectedUsers}
            selectedSolutions={selectedSolutions}
            pid={pid}
          />
        </Grid>
        <Grid item xs={2} />
      </Grid>
    );
  }
}

OtherSolutions.propTypes = {
  readUsersByStyle: PropTypes.object.isRequired,
  readSolutionOfOthers: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  solution: PropTypes.object.isRequired,
  report: PropTypes.object.isRequired,
};

OtherSolutions.defaultProps = {};

const mapDispatchToProps = (state) => ({
  report: state.report.reportReducer,
  solution: state.problem.solutionReducer,
});

export default connect(mapDispatchToProps, {
  readUsersByStyle,
  readSolutionOfOthers,
})(withStyles(styles)(OtherSolutions));