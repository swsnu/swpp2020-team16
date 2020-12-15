import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* M-UIs */
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';

/* Components */
import codingGIF from '../components/HomeAsset/output.gif';

/* REDUXs */
import { readProblem } from '../feature/problem/problemSlice';
import { readProblemInput } from '../feature/problem/problemInputSlice';
import { readProblemOutput } from '../feature/problem/problemOutputSlice';
import { createSolution } from '../feature/problem/solutionSlice';

const styles = (theme) => ({
  ContentTop: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    height: '450px',
  },
  ContentFirst: {
    backgroundColor: '#d0efff',
    padding: theme.spacing(8, 0, 6),
    height: '450px',
  },
  ContentSecond: {
    backgroundColor: '#b5e2ff',
    padding: theme.spacing(8, 0, 6),
    height: '450px',
  },
  ContentThird: {
    backgroundColor: '#8fd3fe',
    padding: theme.spacing(8, 0, 6),
    height: '450px',
  },
  Buttons: {
    marginTop: theme.spacing(4),
  },
  Grid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
});

// Home's default Problem ID

const HOME_PROBLEM_ID = 1;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      toggleImage: false,
    };
  }

  async componentDidMount() {
    await Promise.all([
      this.props.readProblem(HOME_PROBLEM_ID),
      this.props.readProblemInput(HOME_PROBLEM_ID),
      this.props.readProblemOutput(HOME_PROBLEM_ID),
    ]).then(this.setState({ ready: true }));
  }

  onClickGetTested = () => {
    window.location.replace('/beforesolve');
  };

  handleSubmit = async (pid, solution) => {
    this.props.createSolution(pid, solution);
  };

  render() {
    if (!this.state.ready) return null;
    const { user, classes } = this.props;
    return (
      <>
        <main>
          <div className={classes.ContentTop}>
            <Container maxWidth="lg">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                <br />
                Coding MBTI
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
                className="phrase"
              >
                Get thorough insight on your coding habit
              </Typography>
              <div className={classes.Buttons}>
                <Grid container spacing={2} justify="center">
                  {
                    user.username !== null ?
                      null :
                      (
                        <>
                          <Grid item>
                            <Button variant="contained" color="primary" href="/signin/">
                              Sign in
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button variant="outlined" color="primary" href="/signup/">
                              Sign up
                            </Button>
                          </Grid>
                        </>
                      )
                  }
                </Grid>
              </div>
            </Container>
          </div>
          <div className={classes.ContentFirst}>
            <Container maxWidth="lg">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                <br />
                Solve Problems
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
                className="phrase"
              >
                Problems will be easy and short
              </Typography>
              <div className={classes.Buttons}>
                <Grid container spacing={2} justify="center">
                  {
                    user.username !== null ?
                      null :
                      (
                        <>
                          <Grid item>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => this.setState(
                                prevState => ({ toggleImage: !prevState.toggleImage })
                              )}
                            >
                              watch tutorial video
                            </Button>
                          </Grid>
                        </>
                      )
                  }
                </Grid>
              </div>
            </Container>
          </div>
          {
            this.state.toggleImage ? <img src={codingGIF} alt="loading..." /> : null
          }
          <div className={classes.ContentSecond}>
            <Container maxWidth="lg">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                <br />
                Get Analysis On Yourself
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
                className="phrase"
              >
                You will be classified into one of 16 types
              </Typography>
              <div className={classes.Buttons}>
                <Grid container spacing={2} justify="center">
                  {
                    user.username !== null ?
                      null :
                      (
                        <>
                          <Grid item>
                            <Button variant="contained" color="primary" href="/types/">
                              What are 16 types?
                            </Button>
                          </Grid>
                        </>
                      )
                  }
                </Grid>
              </div>
            </Container>
          </div>
          <div className={classes.ContentThird}>
            <Container maxWidth="lg">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                <br />
                Manage Your Coders
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
                className="phrase"
              >
                <br />
                You can manage a team of coders
              </Typography>
            </Container>
            <div className={classes.Buttons}>
              <Grid container spacing={2} justify="center">
                {
                  user.username !== null ?
                    null :
                    (
                      <>
                        <Grid item>
                          <Button variant="contained" color="primary" href="/signup/">
                            Would you be a manager?
                          </Button>
                        </Grid>
                      </>
                    )
                }
              </Grid>
            </div>
          </div>
        </main>
      </>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  problem: PropTypes.object.isRequired,
  problemInput: PropTypes.object.isRequired,
  problemOutput: PropTypes.object.isRequired,
  readProblem: PropTypes.func.isRequired,
  readProblemInput: PropTypes.func.isRequired,
  readProblemOutput: PropTypes.func.isRequired,
  createSolution: PropTypes.func.isRequired,
};

const mapDispatchToProps = (state) => ({
  user: state.user.userSignReducer,
  problem: state.problem.problemReducer,
  problemInput: state.problem.problemInputReducer,
  problemOutput: state.problem.problemOutputReducer,
});

export default connect(mapDispatchToProps, {
  readProblem,
  readProblemInput,
  readProblemOutput,
  createSolution,
})(withStyles(styles)(Home));
