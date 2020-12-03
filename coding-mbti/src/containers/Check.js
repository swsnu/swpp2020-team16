import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* M-UIs */
import Grid from '@material-ui/core/Grid';
import { withAlert } from 'react-alert';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/styles';

/* Components */
import Showprob from '../components/Showprob';
import CodeIDE from '../components/CodeIDE';

/* REDUXs */
import { readProblemByObjective } from '../feature/problem/problemSlice';
import { readProblemInput } from '../feature/problem/problemInputSlice';
import { readProblemOutput } from '../feature/problem/problemOutputSlice';
import { createSolution } from '../feature/problem/solutionSlice';

import request from '../utils/request';

const styles = (theme) => ({
  Content: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  Grid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
});

class Check extends Component {
  async componentDidMount() {
    const res = await request.get('/user/qualified');
    if (res.data === false) {
      const pid = await this.props.readProblemByObjective();
      if (pid !== undefined) {
        await Promise.all([
          this.props.readProblemInput(pid),
          this.props.readProblemOutput(pid),
        ]);
      }
    } else {
      window.location.replace('/my/tests/results');
    }
  }

  handleSubmit = async (pid, solution) => {
    this.props.createSolution(pid, solution);
  }

  render() {
    const {
      problem, classes, problemInput, problemOutput, alert
    } = this.props;
    const pid = problem.id;
    if (problem.error) {
      alert.show(problem.error);
      return (<div />);
    }
    return (
      <main>
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
            signedIn
            pid={pid}
            handleSubmit={this.handleSubmit}
            problemInput={problemInput}
            problemOutput={problemOutput}
          />
        </Container>
      </main>
    );
  }
}

Check.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  classes: PropTypes.object.isRequired,
  problem: PropTypes.object.isRequired,
  problemInput: PropTypes.object.isRequired,
  problemOutput: PropTypes.object.isRequired,
  alert: PropTypes.object.isRequired,
  readProblemByObjective: PropTypes.func.isRequired,
  readProblemInput: PropTypes.func.isRequired,
  readProblemOutput: PropTypes.func.isRequired,
  createSolution: PropTypes.func.isRequired,
};

const mapDispatchToProps = (state) => ({
  problem: state.problem.problemReducer,
  problemInput: state.problem.problemInputReducer,
  problemOutput: state.problem.problemOutputReducer,
});

export default connect(mapDispatchToProps, {
  readProblemByObjective,
  readProblemInput,
  readProblemOutput,
  createSolution,
})(withStyles(styles)(withAlert()(Check)));
