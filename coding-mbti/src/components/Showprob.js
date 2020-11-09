import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { readProblem } from '../feature/problem/problemSlice';

class Showprob extends Component {
  async componentDidMount() {
    await this.props.readProblem();
  }

  render() {
    const {
      title, desc, input, output,
    } = this.props;

    return (
      <Container className="showprob">
        <Grid>
          <h1
            style={{
              borderBottom: 'solid 0.01vw black',
            }}
          >
            {title}
          </h1>
        </Grid>
        <Grid>
          <p>{desc}</p>
        </Grid>
        <Grid>
          <h1
            style={{
              borderBottom: 'solid 0.01vw black',
            }}
          >
            input
          </h1>
        </Grid>
        <Grid>
          <p>{input}</p>
        </Grid>
        <Grid>
          <h1
            style={{
              borderBottom: 'solid 0.01vw black',
            }}
          >
            output
          </h1>
        </Grid>
        <Grid>
          <p>{output}</p>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={6}>
            <h1>input sample</h1>
          </Grid>
          <Grid item xs={6}>
            <h1>output sample</h1>
          </Grid>
          <Grid item xs={6}>
            <pre
              style={{
                backgroundColor: '#f5f6f7',
                padding: '1vw',
              }}
            >
              {`47
  S 10
  S 11
  S 12
  S 13
  H 1
  H 2
  S 6
  S 7
  S 8
  S 9
  H 6
  H 8
  H 9
  H 10
  H 11
  H 4
  H 5
  S 2
  S 3
  S 4
  S 5
  H 12
  H 13
  C 1
  C 2
  D 1
  D 2
  D 3
  D 4
  D 5
  D 6
  D 7
  C 3
  C 4
  C 5
  C 6
  C 7
  C 8
  C 9
  C 10
  C 11
  C 13
  D 9
  D 10
  D 11
  D 12
  D 13`}
            </pre>
          </Grid>
          <Grid item xs={6}>
            <pre
              style={{
                backgroundColor: '#f5f6f7',
                padding: '1vw',
                marginLeft: '0.1vw',
                height: '100%',
              }}
            >
              {`S 1
  H 3
  H 7
  C 12
  D 8`}
            </pre>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

Showprob.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  input: PropTypes.string,
  output: PropTypes.string,
  readProblem: PropTypes.func,
};

Showprob.defaultProps = {
  title: '',
  desc: '',
  input: '',
  output: '',
  readProblem: () => { },
};

const mapDispatchToProps = state => ({
  problem: state.problem.problemReducer,
});

export default connect(mapDispatchToProps, { readProblem })(Showprob);
