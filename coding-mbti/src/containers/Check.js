import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withAlert } from 'react-alert';
import Container from '@material-ui/core/Container';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Showprob from '../components/Showprob';
import CodeIDE from '../components/CodeIDE';
import { readProblem } from '../feature/problem/problemSlice';
import { readProblemInput } from '../feature/problem/problemInputSlice';
import { readProblemOutput } from '../feature/problem/problemOutputSlice';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';

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
    await this.props.readProblem(this.props.match.params.pid);
    await this.props.readProblemInput(this.props.match.params.pid);
    await this.props.readProblemOutput(this.props.match.params.pid - 3);
  }

  render() {
    const { problem, classes, problemInput, problemOutput } = this.props;
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
            <CodeIDE {...this.props} pid={pid} />
          </Container>
        </main>
        <Footer />
      </>
    );
  }
}

Check.propTypes = {
  match: PropTypes.instanceOf(Object),
  classes: PropTypes.object.isRequired,
  problem: PropTypes.object,
  problemInput: PropTypes.object,
  problemOutput: PropTypes.object,
  readProblem: PropTypes.func.isRequired,
  readProblemInput: PropTypes.func.isRequired,
  readProblemOutput: PropTypes.func.isRequired,
};

Check.defaultProps = {
  problem: {
    title: '',
    desc: '',
    input_desc: '',
    output_desc: '',
    pid: '',
    objective: '',
  },
  problemInput: { test_cases: '' },
  problemOutput: { test_cases: '' },
  match: {},
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
})(withStyles(styles)(withAlert()(Check)));
