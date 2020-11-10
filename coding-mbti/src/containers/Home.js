import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Showprob from '../components/Showprob';
import CodeIDEforHome from '../components/CodeIDEforHome';
import { readProblem } from '../feature/problem/problemSlice';
import { readProblemInput } from '../feature/problem/problemInputSlice';
import { readProblemOutput } from '../feature/problem/problemOutputSlice';

const styles = theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
});

class Home extends Component {
  async componentDidMount() {
    await this.props.readProblem();
    const problemId = 1;
    await this.props.readProblemInput(problemId);
    const problemInputId = 1;
    await this.props.readProblemOutput(problemInputId);
  }

  onClickGetTested = () => {
    window.location.replace('/check/1');
  };

  render() {
    const {
      classes, problem, problemInput, problemOutput
    } = this.props;

    return (
      <>
        <Navbar />
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
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
              <div className={classes.heroButtons}>
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
          <Container className={classes.cardGrid} maxWidth="lg">
            <Grid container spacing={4} />
          </Container>
          <Container maxWidth="lg">
            <Showprob
              title={problem.title}
              content={problem.content}
              input={problemInput.content}
              output={problemOutput.content}
            />
          </Container>
          <Container maxWidth="lg">
            <CodeIDEforHome />
          </Container>
        </main>
        <Footer />
      </>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  problem: PropTypes.object,
  problemInput: PropTypes.object,
  problemOutput: PropTypes.object,
  readProblem: PropTypes.func,
  readProblemInput: PropTypes.func,
  readProblemOutput: PropTypes.func,
};

Home.defaultProps = {
  problem: { title: '', content: '' },
  problemInput: { content: '' },
  problemOutput: { content: '' },
  readProblem: () => { },
  readProblemInput: () => { },
  readProblemOutput: () => { },
};

const mapDispatchToProps = state => ({
  problem: state.problem.problemReducer[1],
  problemInput: state.problem.problemInputReducer[1],
  problemOutput: state.problem.problemOutputReducer[1],
});

export default connect(mapDispatchToProps, { readProblem, readProblemInput, readProblemOutput })(withStyles(styles)(withAlert()(Home)));
