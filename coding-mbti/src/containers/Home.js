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
import Showprob from '../components/Showprob';
import CodeIDE from '../components/CodeIDE';

/* REDUXs */
import { readProblem } from '../feature/problem/problemSlice';
import { readProblemInput } from '../feature/problem/problemInputSlice';
import { readProblemOutput } from '../feature/problem/problemOutputSlice';
import { createSolution } from '../feature/problem/solutionSlice';

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
  },
});

// Home's default Problem ID

const HOME_PROBLEM_ID = 1;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
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
    const { user, problem, classes, problemInput, problemOutput } = this.props;
    return (
      <>
        <main>
          <div className={classes.Content}>
            <Container maxWidth="lg">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
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
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="secondary"
                      id="getTested"
                      onClick={this.onClickGetTested}
                    >
                      Get tested
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
          <Container className={classes.Grid} maxWidth="lg">
            <Grid container spacing={4} />
          </Container>
          <Container maxWidth="lg">
            <Showprob
              title={problem.title}
              content={problem.desc}
              input={problem.input_desc}
              output={problem.output_desc}
            />
          </Container>
          <Container maxWidth="lg">
            <CodeIDE
              signedIn={!!user.username}
              pid={HOME_PROBLEM_ID}
              handleSubmit={this.handleSubmit}
              problemInputs={problemInput.content}
              problemOutputs={problemOutput.content}
            />
          </Container>
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
