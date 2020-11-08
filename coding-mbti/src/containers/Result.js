import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TypeInfo from '../components/TypeInfo';
import RadarDiagram from '../components/RadarDiagram';
import BarSingleDiagram from '../components/BarSingleDiagram';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const useStyles = makeStyles((theme) => ({
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
  imageIcon: {
    height: '24px',
    width: '24px',
  },
  iconRoot: {
    textAlign: 'center',
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
              <TypeInfo type="INTJ" />
            </Grid>
            <Grid item xl={12} md={5}>
              <RadarDiagram analysisData={[10, 20, 30, 40, 50, 60, 70, 80]} />
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
              <BarSingleDiagram
                measures={{
                  one: {
                    name: 'User Friendly',
                    data: [10, 20, 30, 40, 50, 60, 70],
                  },
                  another: {
                    name: 'Machine Efficiency',
                    data: [50, 20, 30, 60, 90, 160, 30],
                  },
                }}
                color={0}
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
              <BarSingleDiagram
                measures={{
                  one: {
                    name: 'Carefully Typed',
                    data: [10, 20, 30, 40, 50, 60, 70],
                  },
                  another: {
                    name: 'Just Typed',
                    data: [50, 20, 30, 60, 90, 160, 30],
                  },
                }}
                color={1}
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
              <BarSingleDiagram
                measures={{
                  one: {
                    name: 'Time Complexity',
                    data: [10, 20, 30, 40, 50, 60, 70],
                  },
                  another: {
                    name: 'Intuitive Code',
                    data: [50, 20, 30, 60, 90, 160, 30],
                  },
                }}
                color={2}
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
              <BarSingleDiagram
                measures={{
                  one: {
                    name: 'Formatted Style',
                    data: [10, 20, 30, 40, 50, 60, 70],
                  },
                  another: {
                    name: 'Easy Style',
                    data: [50, 20, 30, 60, 90, 160, 30],
                  },
                }}
                color={3}
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
