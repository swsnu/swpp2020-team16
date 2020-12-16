/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* M-UIs */
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';

import Paper from '@material-ui/core/Paper';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import DoneIcon from '@material-ui/icons/Done';
import { readMyReport, createMyReport } from '../feature/report/reportSlice';

import request from '../utils/request';

const styles = (theme) => ({
  Content: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  Buttons: {
    marginTop: theme.spacing(4),
  },
  Grid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    minHeight: '80vh',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '1vw',
    border: 'solid 0.01vw black',
    color: 'black',
    margin: '1vw',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, .1)',
    },
    cursor: 'default',
  },
  rootNoClick1: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '1vw',
    margin: '1vw',
    cursor: 'default',
  },
  rootNoClick2: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '1vw',
    margin: '1vw',
    color: 'white',
    backgroundColor: '#3f51b5',
    cursor: 'default',
  },
});

const SingleProblem = (props) => {
  return (
    <>
      <Paper className={props.classes.rootNoClick2} elevation={3}>
        <Grid item xs={11}>
          <Typography variant="h6" component="h6">
            problem {props.solution.problem_id} completed
          </Typography>
        </Grid>
        <Grid item xs={1} align="end">
          <DoneIcon />
        </Grid>
      </Paper>
      <Paper
        className={props.classes.rootNoClick1}
        elevation={1}
        alignItems="center"
      >
        <Grid item xs={12}>
          <pre>{props.solution.code}</pre>
        </Grid>
        <Grid item xs={12}>
          {`elapsed time      :${props.solution.elapsed_time}`}
        </Grid>
        <Grid item xs={12}>
          {`erase count       :${props.solution.erase_cnt}`}
        </Grid>
      </Paper>
    </>
  );
};

class LoggedInHome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    await this.props.createMyReport();
    await this.props.readMyReport();
    const res = await request.get('/user/qualified');
    if (res.data === false) {
      window.location.replace('../');
    }
  }

  render() {
    const { classes, report } = this.props;
    const solvedProblems = report.myReport.solutions.map((el) => (
      <SingleProblem classes={classes} solution={el} />
    ));

    return (
      <>
        <Container className={classes.Grid} maxWidth="lg" spacing={10}>
          <Paper className={classes.root} elevation={3} align="center">
            <Grid className="check" item xs={11}>
              <Typography
                variant="h2"
                component="h1"
                className="buttton"
                onClick={() => {
                  window.location.replace('../my/tests/results/');
                }}
              >
                Go to check my report
              </Typography>
            </Grid>
            <Grid item xs={1} align="end">
              <AssignmentIndIcon style={{ fontSize: 60 }} />
            </Grid>
          </Paper>

          {solvedProblems}
        </Container>
      </>
    );
  }
}

LoggedInHome.propTypes = {
  classes: PropTypes.object.isRequired,
  solution: PropTypes.object.isRequired,
  report: PropTypes.object.isRequired,
  readMyReport: PropTypes.object.isRequired,
  createMyReport: PropTypes.object.isRequired,
};

SingleProblem.propTypes = {
  classes: PropTypes.object.isRequired,
  solution: PropTypes.object.isRequired,
  report: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  report: state.report.reportReducer,
});

export default connect(mapStateToProps, { readMyReport, createMyReport })(
  withStyles(styles)(LoggedInHome)
);
