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
    alignItems: 'center',
  },
  Paper: {
    backgroundColor: 'lightgray',
    padding: theme.spacing(1, 2, 1),
    spacing: 3,
    borderRadius: '0.1%',
  },
});

function SingleSolution(props) {
  return (
    <Grid container>
      <Grid item xs={6}>
        elapsed time : {props.elapsedTime} seconds
      </Grid>
      <Grid item xs={6}>
        erase count : {props.eraseCnt} times
      </Grid>
      <Grid className={props.classes.Paper} item xs={12}>
        <pre>{props.code}</pre>
      </Grid>
    </Grid>
  );
}

class UserRelations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      same: [],
      opposite: [],
    };
  }

  componentDidMount() {
    Promise.all([
      this.props.readUsersByStyle(sameStyle),
      this.props.readUsersByStyle(oppositeStyle),
    ]).then((values) => {
      this.setState({ same: values[0] });
      this.setState({ opposite: values[1] });
    });
  }

  render() {
    const { classes } = this.props;
    const { solutions, report } = this.props.report.otherReport;

    const solution1 =
      solutions.length === 0 ? { problem_id: '' } : solutions[0];
    const solution2 =
      solutions.length === 0 ? { problem_id: '' } : solutions[1];
    const solution3 =
      solutions.length === 0 ? { problem_id: '' } : solutions[2];
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
              <Grid item xs={6}>
                UM prediction : {reportt['UM_prediction']}
              </Grid>
              <Grid item xs={6}>
                UM probability : {reportt['UM_probability']}
              </Grid>
              <Grid item xs={6}>
                RT prediction : {reportt['RT_prediction']}
              </Grid>
              <Grid item xs={6}>
                RT probability : {reportt['RT_probability']}
              </Grid>
              <Grid item xs={6}>
                JC prediction : {reportt['JC_prediction']}
              </Grid>
              <Grid item xs={6}>
                JC probability : {reportt['JC_probability']}
              </Grid>
              <Grid item xs={6}>
                TI prediction : {reportt['JC_prediction']}
              </Grid>
              <Grid item xs={6}>
                TI probability : {reportt['TI_probability']}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <h2>
                solution for problem
                {solution1.problem_id}
              </h2>
            </Grid>
            <Grid item xs={12}>
              <SingleSolution
                code={solution1.code}
                elapsedTime={solution1['elapsed_time']}
                eraseCnt={solution1['erase_cnt']}
                classes={classes}
              />
            </Grid>
            <Grid item xs={12}>
              <h2>
                solution for problem
                {solution2.problem_id}
              </h2>
            </Grid>
            <Grid item xs={12}>
              <SingleSolution
                code={solution2.code}
                elapsedTime={solution2['elapsed_time']}
                eraseCnt={solution2['erase_cnt']}
                classes={classes}
              />
            </Grid>
            <Grid item xs={12}>
              <h2>
                solution for problem
                {solution3.problem_id}
              </h2>
            </Grid>
            <Grid item xs={12}>
              <SingleSolution
                code={solution3.code}
                elapsedTime={solution3['elapsed_time']}
                eraseCnt={solution3['erase_cnt']}
                classes={classes}
              />
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
