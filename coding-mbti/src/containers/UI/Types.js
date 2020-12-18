/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import TypeInfo from '../../components/UI/TypeInfo';
import StyleGridComponent from '../../components/AnalysisResult/StyleGrid';

const styles = (theme) => ({
  Page: {
    backgroundColor: '#eeggef',
    padding: theme.spacing(8, 12, 8),
    alignItems: 'center',
  },
  Paper: {
    backgroundColor: 'white',
    padding: theme.spacing(1, 2, 1),
    spacing: 3,
    borderRadius: '0.1%',
  },
  fontBig: {
    fontSize: '2vh',
  },
  Criterion: {
    backgroundColor: 'pink',
    padding: '1vw',
    border: '0.2vw',
    fontSize: '1.5vw',
  },
  Criterion1: {
    backgroundColor: 'pink',
    padding: '1vw',
    border: '0.2vw',
    fontSize: '1.5vw',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  Criterion2: {
    backgroundColor: 'skyblue',
    padding: '1vw',
    border: '0.2vw',
    fontSize: '1.5vw',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  Border: {
    borderBottom: 'solid 0.1vw lightGray',
    padding: '1vh',
  },
});

class Types extends React.Component {
  render() {
    const { classes } = this.props;
    let style;
    if (this.props.match && this.props.match.params) {
      style = this.props.match.params.style;
    } else {
      style = this.props.style;
    }

    return (
      <>
        <Grid className={classes.Page} spacing={3} container>
          <Grid item xs={1} />
          <Grid item xs={10} align="center" className={classes.fontBig}>
            <Paper className={classes.Paper} elevation={3}>
              <TypeInfo type={style} />
            </Paper>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={1} />
          <Grid item xs={10} align="center" className={classes.fontBig}>
            <Paper className={classes.Paper} elevation={3}>
              <strong style={{ fontSize: '3vw' }}>
                Your Coding MBTI result is {style}!{' '}
              </strong>
              <br />
              You've got{' '}
              <strong style={{ fontSize: '1.5vw' }}>{style[0]} </strong> for
              'user friendly vs machine friendly'.
              <br />
              You've got{' '}
              <strong style={{ fontSize: '1.5vw' }}>{style[1]}</strong> for
              'Time complexity vs Intuitive code'.
              <br />
              You've got{' '}
              <strong style={{ fontSize: '1.5vw' }}>{style[2]}</strong> for
              'Rabbit vs Turtle'. <br />
              You've got{' '}
              <strong style={{ fontSize: '1.5vw' }}>{style[3]}</strong> for
              'Just type vs Carefully type'.
              <br />
              For more details like what each criterion's result means, read
              through the following paragraphs.
            </Paper>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={1} />
          <Grid item xs={10}>
            <Paper className={classes.Paper}>
              <Grid
                container
                align="center"
                spacing={3}
                className={classes.fontBig}
              >
                {[
                  'User friendly vs Machine friendly',
                  'Time complexity vs Intuitive code',
                  'Rabbit vs Turtle',
                  'Just type vs Carefully type',
                ].map((criterion) => {
                  if (criterion === 'User friendly vs Machine friendly') {
                    return (
                      <>
                        <Grid className={classes.Criterion1} item xs={4}>
                          {criterion}
                        </Grid>
                        <Grid
                          align="left"
                          item
                          xs={8}
                          className={classes.Border}
                        >
                          If you've got{' '}
                          <strong style={{ fontSize: '1.5vw' }}>U</strong> which
                          means{' '}
                          <strong style={{ fontSize: '1.3vw' }}>
                            'user friendly'
                          </strong>
                          , you write down code that very easy to read by other
                          coders. You do care about your readability of your
                          codes. You might be going to get lots of compliments
                          by your co-workers. This is always a good thing,
                          writing code with good readability
                          <br />
                          If you've got{' '}
                          <strong style={{ fontSize: '1.5vw' }}>M</strong> which
                          means{' '}
                          <strong style={{ fontSize: '1.3vw' }}>
                            'machine friendly'
                          </strong>
                          , you write down code that is somewhat hard to
                          understand by other coders. You don't really care
                          about readability of your codes. You might be going to
                          get complaints about your code by your co-workers. I
                          recommend you to read many other codes with good
                          readability, Since it is always a good thing to write
                          code with good reability.
                        </Grid>
                      </>
                    );
                  }
                  if (criterion === 'Time complexity vs Intuitive code') {
                    return (
                      <>
                        <Grid
                          align="left"
                          className={classes.Border}
                          item
                          xs={8}
                        >
                          If you've got{' '}
                          <strong style={{ fontSize: '1.5vw' }}>T</strong>
                          which means{' '}
                          <strong style={{ fontSize: '1.3vw' }}>
                            'Time Complexity'
                          </strong>
                          , you do care about time complexity of your code. You
                          must be use time for make your code run fast and
                          efficientely. You might be going to get lots of
                          compliments by your co-workers for fast running codes.
                          But you also need to be cautious of that there can be
                          a situation that time complexity really doesn't
                          matter, especially when you have many resources.
                          <br />
                          If you've got{' '}
                          <strong style={{ fontSize: '1.5vw' }}>I</strong> which
                          means{' '}
                          <strong style={{ fontSize: '1.3vw' }}>
                            'Intuitive code'
                          </strong>
                          , you don't really care about time complexity of your
                          code. You must be just solving problem as it is. You
                          don't really spend time thinking of any novel
                          solutions or efficient solutions, you just solve it.
                          You might be going to get complaints about your slow
                          running codes by your co-workers.
                        </Grid>
                        <Grid className={classes.Criterion1} item xs={4}>
                          {criterion}
                        </Grid>
                      </>
                    );
                  }
                  if (criterion === 'Rabbit vs Turtle') {
                    return (
                      <>
                        <Grid className={classes.Criterion1} item xs={4}>
                          {criterion}
                        </Grid>
                        <Grid
                          align="left"
                          className={classes.Border}
                          item
                          xs={8}
                        >
                          If you've got{' '}
                          <strong style={{ fontSize: '1.5vw' }}>R</strong> which
                          means{' '}
                          <strong style={{ fontSize: '1.3vw' }}>
                            'Rabbit'
                          </strong>
                          , you solve a problem in a very clever way, even
                          though it is not the way that is directed by the given
                          problem like a rabbit. You might find yourself
                          thinking about what is the easiest way to solve this
                          problem most of times. You must be getting many
                          compliments on your cleverness by your co-workers. But
                          you have to be cautious about it, since in the world
                          there are some who hate people who doesn't follow
                          rules.
                          <br />
                          If you've got{' '}
                          <strong style={{ fontSize: '1.5vw' }}>T</strong> which
                          means{' '}
                          <strong style={{ fontSize: '1.3vw' }}>
                            'Turtle'
                          </strong>
                          , you solve a problem in a very honest way. If given
                          problem direct you to solve it in a certain way, even
                          if it is not efficient way, you follow it without any
                          complaints. Sometimes you might get applause because
                          of your honesty, but sometimes there might be a
                          adversity caused by your honesty since following
                          direction can be note the best way.
                        </Grid>
                      </>
                    );
                  }
                  return (
                    <>
                      <Grid align="left" className={classes.Border} item xs={8}>
                        If you've got{' '}
                        <strong style={{ fontSize: '1.5vw' }}>J</strong> which
                        means{' '}
                        <strong style={{ fontSize: '1.3vw' }}>
                          'Just type'
                        </strong>
                        , you don't spend long time solving a problem and you
                        did not erase that many times. This can mean you are
                        fast, but simultaneosly this can mean you are kind of in
                        a hurry when solving the problem. So you might find
                        yourself spend lots of time debugging small bugs. So you
                        might need to be more careful.
                        <br />
                        If you've got{' '}
                        <strong style={{ fontSize: '1.5vw' }}>C</strong> which
                        means{' '}
                        <strong style={{ fontSize: '1.3vw' }}>
                          'Carefully type'
                        </strong>
                        , you spend long time solving a given problem and you
                        did erase many times when writing code. This can mean
                        you are very careful, but simultaneosly this can mean
                        you are too slow. So you might have to be cautious of
                        not spending too much time on the first shot, since
                        there are second or more chances most of the times.
                      </Grid>
                      <Grid className={classes.Criterion1} item xs={4}>
                        {criterion}
                      </Grid>
                    </>
                  );
                })}
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={1} />
          <Grid item xs={10} />
          <StyleGridComponent
            handleClick={(style) => {
              window.location.href = `../../../types/${style}`;
            }}
          />
          <Grid item xs={1} />
        </Grid>
      </>
    );
  }
}

Types.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  style: PropTypes.string.isRequired,
};

Types.defaultProps = {};

export default withStyles(styles)(Types);
