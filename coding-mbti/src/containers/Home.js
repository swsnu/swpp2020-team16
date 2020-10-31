import React from 'react';
import Button from '@material-ui/core/Button';
import Footer from '../components/Footer.js';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Navbar from '../components/Navbar.js';
import Showprob from '../components/Showprob.js';
const useStyles = makeStyles((theme) => ({
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
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function HomeOMG() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Navbar />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
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
                  <Button variant="contained" color="primary">
                    Sign in
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Sign up
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="secondary">
                    Get tested
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}></Grid>
        </Container>
        <Container maxWidth="md">
          <Showprob />
        </Container>
        <Container maxWidth="md">
          <div
            className="sec-widget"
            data-widget="7bc5d5f13cb49e792b6a906844e5e60b"
            data-theme="dark"
          ></div>
        </Container>
      </main>
      {/* Footer */}
      <Footer />
    </React.Fragment>
  );
}
