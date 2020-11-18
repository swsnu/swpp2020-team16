import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    fontSize: 30,
    fontWeight: 400,
    color: 'black',
    width: '100%',
    height: '25vh',
    backgroundColor: 'lightblue',
    border: 'white 0.02vw solid',
    cursor: 'default',
    '&:hover': {
      backgroundColor: 'rgb(7, 177, 77, 0.42)',
    },
  },
}));

const ButtonBox = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { pid, style } = props;
  const handleClick = () => {
    history.push(`/check/result/${pid}/${style}`);
  };

  return (
    <Grid className={classes.box} onClick={handleClick} item xs={3}>
      {style}
    </Grid>
  );
};

const ShowOtherCodersSolutions = (props) => {
  const classes = useStyles();
  const { pid } = props.match.params;

  const styleList = [
    'UTEJ',
    'UTEC',
    'UTFJ',
    'UTFC',
    'UIEJ',
    'UIEC',
    'UIFJ',
    'UIFC',
    'MTEJ',
    'MTEC',
    'MTFJ',
    'MTFC',
    'MIEJ',
    'EIEC',
    'MIFJ',
    'MIFC',
  ];

  const styleBox = styleList.map((el) => <ButtonBox pid={pid} style={el} />);
  return (
    <Grid container className="showothercoderssolutions">
      {styleBox}
    </Grid>
  );
};

ShowOtherCodersSolutions.propTypes = {};

ShowOtherCodersSolutions.defaultProps = {};

export default ShowOtherCodersSolutions;
