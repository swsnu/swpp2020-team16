import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// import MbtiType from '../components/MbtiType';
import RadarDiagram from '../components/RadarDiagram';
import BarSingleDiagram from '../components/BarSingleDiagram';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 7, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Result() {
  const classes = useStyles();
  return (
    <>
      <Navbar />
      <main>
        <div className={classes.heroContent}>
          <Typography
            component="h2"
            variant="h3"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Analysis Result
          </Typography>
          <Grid container spacing={4} justify="center">
            <Grid item xl={12} md={5}>
              <RadarDiagram />
            </Grid>
            <Grid item xl={12} md={5}>
              <RadarDiagram />
            </Grid>
          </Grid>
          <Typography
            component="h2"
            variant="h3"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Thorough Analysis Based On Each Measure
          </Typography>
          <Typography
            component="h2"
            variant="subtitle1"
            align="left"
            color="textSecondary"
            paragraph
            gutterBottom
          >
            User Friendly VS Machine Efficiency
          </Typography>
          <Grid container spacing={4} justify="center">
            <Grid item xl={12} md={5}>
              <BarSingleDiagram measures={{
                one: 'User Friendly',
                another: 'Machine Efficiency',
              }}
              />
            </Grid>
          </Grid>
          <Typography
            component="h2"
            variant="subtitle1"
            align="left"
            color="textSecondary"
            paragraph
            gutterBottom
          >
            Carefully Typed VS Just Typed
          </Typography>
          <Grid container spacing={4} justify="center">
            <Grid item xl={12} md={5}>
              <BarSingleDiagram measures={{
                one: 'Carefully Typed',
                another: 'Just Typed',
              }}
              />
            </Grid>
          </Grid>
          <Typography
            component="h2"
            variant="subtitle1"
            align="left"
            color="textSecondary"
            paragraph
            gutterBottom
          >
            Time Complexity VS Intuitive Code
          </Typography>
          <Grid container spacing={4} justify="center">
            <Grid item xl={12} md={5}>
              <BarSingleDiagram measures={{
                one: 'Time Complexity',
                another: 'Intuitive Code',
              }}
              />
            </Grid>
          </Grid>
          <Typography
            component="h2"
            variant="subtitle1"
            align="left"
            color="textSecondary"
            paragraph
            gutterBottom
          >
            Formatted Style VS Easy Style
          </Typography>
          <Grid container spacing={4} justify="center">
            <Grid item xl={12} md={5}>
              <BarSingleDiagram measures={{
                one: 'Formatted Style',
                another: 'Easy Style',
              }}
              />
            </Grid>
          </Grid>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button variant="contained" color="secondary">
                  Share!
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary">
                  Explore!
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </main>
      <Footer className={classes.footer} />
    </>
  );
}
