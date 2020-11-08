import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Showprob from '../components/Showprob';
import CodeIDE from '../components/CodeIDE';

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

export default function Check(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { pid } = props.match.params;

  const onPutTestResult = (data) => dispatch(actionCreators.putTestResult(data));
  return (
    <>
      <Navbar />
      <main>
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
          <CodeIDE {...props} onPutTestResult={onPutTestResult} pid={pid} />
        </Container>
      </main>
      <Footer />
    </>
  );
}

Check.propTypes = {
  history: PropTypes.instanceOf(Object),
  match: PropTypes.instanceOf(Object),
};
Check.defaultProps = {
  history: {},
  match: {},
};
