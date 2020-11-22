import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* M-UIs */
import Grid from '@material-ui/core/Grid';
import { withAlert } from 'react-alert';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/styles';

/* Components */
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
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
  Grid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
});

class Check extends Component {
  async componentDidMount() {
    await Promise.all([
      this.props.readProblem(this.props.match.params.pid),
      this.props.readProblemInput(this.props.match.params.pid),
      this.props.readProblemOutput(this.props.match.params.pid),
    ]);
  }

  handleSubmit = async (pid, solution) => {
    await createSolution(pid, solution);
  }

  render() {
    const {
      problem, classes, problemInput, problemOutput
    } = this.props;
    const { pid } = this.props.match.params;

    return (
      <>
        <Navbar />
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
              signedIn={false}
              pid={pid}
              handleSubmit={this.handleSubmit}
              problemInput={problemInput}
              problemOutput={problemOutput}
            />
          </Container>
        </main>
        <Footer />
      </>
    );
  }
}

Check.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  classes: PropTypes.object.isRequired,
  problem: PropTypes.object.isRequired,
  problemInput: PropTypes.object.isRequired,
  problemOutput: PropTypes.object.isRequired,
  readProblem: PropTypes.func.isRequired,
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
  readProblem,
  readProblemInput,
  readProblemOutput,
  createSolution,
})(withStyles(styles)(withAlert()(Check)));
