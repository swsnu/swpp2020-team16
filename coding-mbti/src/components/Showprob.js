import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const Showprob = (props) => {
  const { title, content, input, output } = props;

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
        <p>{content}</p>
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
            {}
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
            {}
          </pre>
        </Grid>
      </Grid>
    </Container>
  );
};

Showprob.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  input: PropTypes.string,
  output: PropTypes.string,
};

Showprob.defaultProps = {
  title: 'hi',
  content: '',
  input: '',
  output: '',
};

export default Showprob;
