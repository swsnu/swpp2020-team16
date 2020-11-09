import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Showprob from '../components/Showprob';
import CodeIDEforHome from '../components/CodeIDEforHome';

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
}));

function Home() {
  const classes = useStyles();
  const onClickGetTested = () => {
    window.location.replace('/check/1');
  };
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
                    onClick={onClickGetTested}
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
            title="Finding Missing Cards"
            desc="Taro is going to play a card game. However, now he has only n cards, even though there should be 52 cards (he has no Jokers). The 52 cards include 13 ranks of each of the four suits: spade, heart, club and diamond."
            input="In the first line, the number of cards n (n ≤ 52) is given. In the following n lines, data of the n cards are given. Each card is given by a pair of a character and an integer which represent its suit and rank respectively. A suit is represented by 'S', 'H', 'C' and 'D' for spades, hearts, clubs and diamonds respectively. A rank is represented by an integer from 1 to 13."
            output=" Print the missing cards. The same as the input format, each card should be printed with a character and an integer separated by a space character in a line. Arrange the missing cards in the following priorities: Print cards of spades, hearts, clubs and diamonds in this order. If the suits are equal, print cards with lower ranks first."
          />
        </Container>
        <Container maxWidth="lg">
          <CodeIDEforHome />
        </Container>
      </main>
      {/* Footer */}
      <Footer />
    </>
  );
}

export default Home;
