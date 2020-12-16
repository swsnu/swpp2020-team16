import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* M-UIs */
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

import Paper from '@material-ui/core/Paper';

import request from '../../utils/request';

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
    minHeight: '90vh',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '1vw',
    backgroundColor: '#3f51b5',
    color: 'white',
    margin: '1vw',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, .1)',
    },
    cursor: 'default',
  },
  desc: {
    padding: '1vw',
    fontSize: '1.5vw',
  },
});

class BeforeSolve extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const res = await request.get('/user/qualified');
    if (res.data === true) {
      window.location.replace('/home');
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <Grid container className={classes.Grid} maxWidth="lg" spacing={10}>
          <Grid item className="check" xs={1} />
          <Grid item xs={10}>
            <Paper className={classes.desc} elevation={4}>
              <Grid container className={classes.desc}>
                <Grid item xs={12}>
                  <Typography variant="h3" component="h1">
                    {' '}
                    Before move ahead, there are few things you need to know.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <br />
                  1. You will be given 3 problems. <br />
                  2. You should solve each problem correctly to move on to the
                  next problem and to finally get a proper result
                  <br />
                  3. There is no time limitation <br />
                  4. Once you solve all three of problems correctly, you will be
                  directed to a result page.
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={1} />

          <Grid item xs={3} />
          <Grid item xs={6}>
            <Paper className={classes.root} elevation={3} align="center">
              <Grid
                className="goToSolve"
                onClick={() => {
                  window.location.replace('../solve/');
                }}
                item
                xs={12}
              >
                <Typography variant="h2" component="h1">
                  Let&apos;s go!
                </Typography>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={3} />
        </Grid>
      </>
    );
  }
}

BeforeSolve.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BeforeSolve);
