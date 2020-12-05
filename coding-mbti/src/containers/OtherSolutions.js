import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { readUsersByStyle } from '../feature/report/reportSlice';
import { readSolutionOfOthers } from '../feature/problem/solutionSlice';
import OtherSolutionsTable from '../components/OtherSolutionsTable';

const styleToIntDict = {
  UTRJ: 1,
  UTRC: 2,
  UTTJ: 3,
  UTTC: 4,
  UIRJ: 5,
  UIRC: 6,
  UITJ: 7,
  UITC: 8,
  MTRJ: 9,
  MTRC: 10,
  MTTJ: 11,
  MTTC: 12,
  MIRJ: 13,
  MIRC: 14,
  MITJ: 15,
  MITC: 16,
};
const mapStyleToInt = (style) => styleToIntDict[style];

const styles = (theme) => ({
  Page: {
    backgroundColor: 'white',
    padding: theme.spacing(8, 0, 6),
  },
});

let styleInt = 1;
let pid = 1;

class OtherSolutions extends Component {
  componentDidMount() {
    this.props.readUsersByStyle(styleInt).then((res) => {
      this.props.readSolutionOfOthers(res, pid);
    });
  }

  render() {
    const { classes } = this.props;
    const styleStr = this.props.match.params.style;
    styleInt = mapStyleToInt(this.props.match.params.style);
    pid = this.props.match.params.pid;
    const selectedUsers = this.props.report.selectedUsers
      ? this.props.report.selectedUsers
      : [];
    const selectedSolutions =
      this.props.solution.selectedSolutions.length === 0
        ? []
        : this.props.solution.selectedSolutions;

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
