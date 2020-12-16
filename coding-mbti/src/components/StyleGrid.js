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

const StyleGrid = (props) => {
  let handleClick;
  if (!props.handleClick) {
    handleClick = (style) => {
      window.location.replace(`${style}`);
    };
  } else {
    handleClick = props.handleClick;
  }

  const classes = useStyles();

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

  const styleBox = styleList.map((style) => (
    <Grid
      key={style}
      className={classes.box}
      onClick={() => handleClick(style)}
      item
      xs={3}
    >
      {style}
    </Grid>
  ));

  return (
    <Grid container className="styleGrid">
      {styleBox}
    </Grid>
  );
};

StyleGrid.propTypes = {
  pid: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};

StyleGrid.defaultProps = {
  pid: '1',
};

export default StyleGrid;
