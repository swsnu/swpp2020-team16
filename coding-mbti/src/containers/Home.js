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
import CodeIDE from '../components/CodeIDE';
import { readProblem } from '../feature/problem/problemSlice';

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

class Home extends Component {
  async componentDidMount() {
    await this.props.readProblem(28);
  }

  onClickGetTested = () => {
    window.location.replace('/check/28');
  };

  render() {
    const { problem, classes } = this.props;
    console.log(this.props);

    return (
      <>
        <Navbar />
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
            <CodeIDE pid="-1" />
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
  readProblem: PropTypes.func.isRequired,
};

Home.defaultProps = {
  problem: {
    title: '',
    desc: '',
    input_desc: '',
    output_desc: '',
    pid: '',
    objective: '',
  },
};

const mapDispatchToProps = (state) => ({
  problem: state.problem.problemReducer,
});

export default connect(mapDispatchToProps, {
  readProblem,
})(withStyles(styles)(withAlert()(Home)));
