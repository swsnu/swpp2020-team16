import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FindCodersByStyle from '../components/FindCodersByStyle';
import {
  readUsersByStyle,
  readOtherReport,
} from '../feature/report/reportSlice';
import TypeInfo from '../components/TypeInfo';
import RadarDiagram from '../components/RadarDiagram';
import BarSingleDiagram from '../components/BarSingleDiagram';

const styles = (theme) => ({
  Page: {
    backgroundColor: 'white',
    alignItems: 'center',
    margin: 0,
  },
  Paper: {
    backgroundColor: 'lightgray',
    padding: theme.spacing(1, 2, 1),
    spacing: 3,
    borderRadius: '0.1%',
  },
  box1: {
    padding: theme.spacing(5),
  },
  box2: {
    padding: theme.spacing(5),
    height: '80%',
    marginBottom: '10vw',
  },
});

function SingleSolution(props) {
  return (
    <Grid container>
      <Grid item xs={6}>
        elapsed time : {props.elapsedTime} ms
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

let myStyleInt = 1;
let oppositeStyleInt = 16;
let reportt = { title: '', style_str: 'MTTC' };
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
      this.props.readUsersByStyle(myStyleInt),
      this.props.readUsersByStyle(oppositeStyleInt),
    ]).then((values) => {
      this.setState({ same: values[0] });
      this.setState({ opposite: values[1] });
    });
  }

  render() {
    const { classes } = this.props;
    myStyleInt = this.props.report.myReport.report.style_int;
    oppositeStyleInt = 17 - myStyleInt;

    const { solutions, report } = this.props.report.otherReport;
    if (Object.keys(report).length !== 0) {
      reportt = report;
    }

    const solution1 =
      solutions.length === 0 ? { problem_id: '' } : solutions[0];
    const solution2 =
      solutions.length === 0 ? { problem_id: '' } : solutions[1];
    const solution3 =
      solutions.length === 0 ? { problem_id: '' } : solutions[2];

    const umPrediction = reportt.UM_prediction;
    const tiPrediction = reportt.TI_prediction;
    const rtPrediction = reportt.RT_prediction;
    const jcPrediction = reportt.JC_prediction;

    let uProb;
    let mProb;
    let t1Prob;
    let iProb;
    let rProb;
    let t2Prob;
    let jProb;
    let cProb;
    if (umPrediction === 1) {
      uProb = reportt.UM_probability;
      mProb = 1 - uProb;
    } else {
      mProb = reportt.UM_probability;
      uProb = 1 - uProb;
    }

    if (tiPrediction === 1) {
      t1Prob = reportt.TI_probability;
      iProb = 1 - t1Prob;
    } else {
      iProb = reportt.TI_probability;
      t1Prob = 1 - iProb;
    }

    if (rtPrediction === 1) {
      rProb = reportt.RT_probability;
      t2Prob = 1 - rProb;
    } else {
      t2Prob = reportt.RT_probability;
      rProb = 1 - t2Prob;
    }

    if (jcPrediction === 1) {
      jProb = reportt.JC_probability;
      cProb = 1 - jProb;
    } else {
      cProb = reportt.JC_probability;
      jProb = 1 - cProb;
    }

    return (
      <Grid container className={classes.Page} spacing={3} item xs={12}>
        <Grid item xs={12}>
          <Paper align="center" className={classes.box1} elevation={3}>
            <FindCodersByStyle
              same={this.state.same}
              opposite={this.state.opposite}
              readOtherReport={this.props.readOtherReport}
            />
          </Paper>
        </Grid>
        <Grid container spacing={3} className={classes.Page} item xs={12}>
          <Paper elevation={12} className={classes.box1}>
            <Grid container>
              <Grid item xs={1} />
              <Grid
                className="userRelations"
                container
                spacing={3}
                item
                xs={10}
              >
                <Grid item xs={12}>
                  <Typography variant="h2">
                    <strong>{reportt.title}</strong>
                  </Typography>
                </Grid>

                <Grid container spacing={3} item xs={12}>
                  <Grid item xs={6} align="center">
                    <Paper className={classes.box2} elevation={3}>
                      <TypeInfo type={reportt.style_str} />
                    </Paper>
                  </Grid>
                  <Grid item xs={6} align="center">
                    <Paper className={classes.box2} elevation={3}>
                      <RadarDiagram
                        analysisData={[
                          uProb * 100,
                          cProb * 100,
                          t1Prob * 100,
                          rProb * 100,
                          mProb * 100,
                          jProb * 100,
                          iProb * 100,
                          t2Prob * 100,
                        ]}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper className={classes.box1} elevation={12}>
                      <Grid container>
                        <Grid item xs={12} align="center">
                          <Typography
                            component="h3"
                            variant="h4"
                            align="center"
                            color="textSecondary"
                            paragraph
                            gutterBottom
                          >
                            User Friendly VS Machine Efficiency
                          </Typography>
                        </Grid>
                        <Grid container spacing={4} justify="center">
                          <Grid item xl={12} md={5}>
                            <BarSingleDiagram
                              measures={{
                                one: {
                                  name: 'User Friendly',
                                  data: [uProb * 100],
                                },
                                another: {
                                  name: 'Machine Efficiency',
                                  data: [mProb * 100],
                                },
                              }}
                              color={0}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper className={classes.box1} elevation={12}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography
                            component="h2"
                            variant="h4"
                            align="center"
                            color="textSecondary"
                            paragraph
                            gutterBottom
                          >
                            Carefully Typed VS Just Typed
                          </Typography>
                        </Grid>
                        <Grid container spacing={4} justify="center">
                          <Grid item xl={12} md={5}>
                            <BarSingleDiagram
                              measures={{
                                one: {
                                  name: 'Carefully Typed',
                                  data: [cProb * 100],
                                },
                                another: {
                                  name: 'Just Typed',
                                  data: [jProb * 100],
                                },
                              }}
                              color={1}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper className={classes.box1} elevation={12}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography
                            component="h2"
                            variant="h4"
                            align="center"
                            color="textSecondary"
                            paragraph
                            gutterBottom
                          >
                            Time Complexity VS Intuitive Code
                          </Typography>
                        </Grid>
                        <Grid container spacing={4} justify="center">
                          <Grid item xl={12} md={5}>
                            <BarSingleDiagram
                              measures={{
                                one: {
                                  name: 'Time Complexity',
                                  data: [t1Prob * 100],
                                },
                                another: {
                                  name: 'Intuitive Code',
                                  data: [iProb * 100],
                                },
                              }}
                              color={2}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper className={classes.box1} elevation={12}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography
                            component="h2"
                            variant="h4"
                            align="center"
                            color="textSecondary"
                            paragraph
                            gutterBottom
                          >
                            Rabbit VS Turtle
                          </Typography>
                        </Grid>
                        <Grid container spacing={4} justify="center">
                          <Grid item xl={12} md={5}>
                            <BarSingleDiagram
                              measures={{
                                one: {
                                  name: 'Rabbit',
                                  data: [rProb * 100],
                                },
                                another: {
                                  name: 'Turtle',
                                  data: [t2Prob * 100],
                                },
                              }}
                              color={3}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Paper>
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
                    elapsedTime={solution1.elapsed_time}
                    eraseCnt={solution1.erase_cnt}
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
                    elapsedTime={solution2.elapsed_time}
                    eraseCnt={solution2.erase_cnt}
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
                    elapsedTime={solution3.elapsed_time}
                    eraseCnt={solution3.erase_cnt}
                    classes={classes}
                  />
                </Grid>
              </Grid>
              <Grid item xs={1} />
            </Grid>
          </Paper>
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
  elapsedTime: PropTypes.number,
  eraseCnt: PropTypes.number,
  code: PropTypes.string,
};
SingleSolution.propTypes = {
  classes: PropTypes.object.isRequired,
  elapsedTime: PropTypes.number,
  eraseCnt: PropTypes.number,
  code: PropTypes.string,
};

UserRelations.defaultProps = {
  elapsedTime: 0,
  eraseCnt: 0,
  code: 'hi',
};
SingleSolution.defaultProps = {
  elapsedTime: 0,
  eraseCnt: 0,
  code: 'hi',
};

const mapDispatchToProps = (state) => ({
  report: state.report.reportReducer,
});

export default connect(mapDispatchToProps, {
  readUsersByStyle,
  readOtherReport,
})(withStyles(styles)(UserRelations));
