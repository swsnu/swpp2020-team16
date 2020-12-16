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
import { createMyReport } from '../feature/report/reportSlice';

import request from '../utils/request';

const styles = (theme) => ({
  Content: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  Grid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
  IDE: {
    height: '130vh',
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
      window.location.replace('/home');
    }
  }

  handleSubmit = async (pid, solution) => {
    await this.props.createSolution(pid, solution);
    window.location.reload();
  };

  render() {
    const {
      user,
      problem,
      classes,
      problemInput,
      problemOutput,
      alert,
    } = this.props;
    const pid = problem.id;
    if (problem.error) {
      alert.show(problem.error);
      return <div />;
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
        <Container className={classes.IDE} maxWidth="lg">
          <CodeIDE
            signedIn={!!user.username}
            pid={pid}
            handleSubmit={this.handleSubmit}
            problemInputs={problemInput.content}
            problemOutputs={problemOutput.content}
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
  user: PropTypes.object.isRequired,
  alert: PropTypes.object.isRequired,
  readProblemByObjective: PropTypes.func.isRequired,
  readProblemInput: PropTypes.func.isRequired,
  readProblemOutput: PropTypes.func.isRequired,
  createSolution: PropTypes.func.isRequired,
  createMyReport: PropTypes.func.isRequired,
};

const mapDispatchToProps = (state) => ({
  user: state.user.userSignReducer,
  problem: state.problem.problemReducer,
  problemInput: state.problem.problemInputReducer,
  problemOutput: state.problem.problemOutputReducer,
});

export default connect(mapDispatchToProps, {
  readProblemByObjective,
  readProblemInput,
  readProblemOutput,
  createSolution,
  createMyReport,
})(withStyles(styles)(withAlert()(Check)));
