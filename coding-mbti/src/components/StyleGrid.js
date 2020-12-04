import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
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
  const { pid, style } = props;
  const handleClick = () => {
    window.location.replace(`../${pid}/${style}`);
  };

  return (
    <Grid className={classes.box} onClick={handleClick} item xs={3}>
      {style}
    </Grid>
  );
};

const StyleGrid = (props) => {
  const { pid } = props.match.params;

  const styleList = [
    'UTRJ',
    'UTRC',
    'UTTJ',
    'UTTC',
    'UIRJ',
    'UIRC',
    'UITJ',
    'UITC',
    'MTRJ',
    'MTRC',
    'MTTJ',
    'MTTC',
    'MIRJ',
    'EIRC',
    'MITJ',
    'MITC',
  ];

  const styleBox = styleList.map((el) => (
    <ButtonBox key={el} pid={pid} style={el} />
  ));
  return (
    <Grid container className="styleGrid">
      {styleBox}
    </Grid>
  );
};

StyleGrid.propTypes = {
  pid: PropTypes.string,
  classes: PropTypes.object.isRequired,
  style: PropTypes.string,
  match: PropTypes.object.isRequired,
};

StyleGrid.defaultProps = {
  pid: '1',
  style: '1',
};

ButtonBox.propTypes = {
  pid: PropTypes.string,
  classes: PropTypes.object.isRequired,
  style: PropTypes.string,
  match: PropTypes.object.isRequired,
};

ButtonBox.defaultProps = {
  pid: '1',
  style: '1',
};

export default StyleGrid;
