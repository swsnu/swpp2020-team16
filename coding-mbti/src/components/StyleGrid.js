import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import { ReactComponent as UTRC } from './TypeIcons/UTRC.svg';
import { ReactComponent as UTRJ } from './TypeIcons/UTRJ.svg';
import { ReactComponent as MTRC } from './TypeIcons/MTRC.svg';
import { ReactComponent as MTRJ } from './TypeIcons/MTRJ.svg';

import { ReactComponent as MTTC } from './TypeIcons/MTTC.svg';
import { ReactComponent as UTTC } from './TypeIcons/UTTC.svg';
import { ReactComponent as UTTJ } from './TypeIcons/UTTJ.svg';
import { ReactComponent as MTTJ } from './TypeIcons/MTTJ.svg';

import { ReactComponent as MIRC } from './TypeIcons/MIRC.svg';
import { ReactComponent as UIRC } from './TypeIcons/UIRC.svg';
import { ReactComponent as MIRJ } from './TypeIcons/MIRJ.svg';
import { ReactComponent as MITC } from './TypeIcons/MITC.svg';

import { ReactComponent as MITJ } from './TypeIcons/MITJ.svg';
import { ReactComponent as UIRJ } from './TypeIcons/UIRJ.svg';
import { ReactComponent as UITC } from './TypeIcons/UITC.svg';
import { ReactComponent as UITJ } from './TypeIcons/UITJ.svg';

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
      window.location.href = `${style}`;
    };
  } else {
    handleClick = props.handleClick;
  }

  console.log(props.handleClick);
  console.log(handleClick);

  const classes = useStyles();

  const styleList = [
    { type: 'UTRJ', icon: UTRJ },
    { type: 'UTRC', icon: UTRC },
    { type: 'UTTJ', icon: UTTJ },
    { type: 'UTTC', icon: UTTC },
    { type: 'UIRJ', icon: UIRJ },
    { type: 'UIRC', icon: UIRC },
    { type: 'UITJ', icon: UITJ },
    { type: 'UITC', icon: UITC },
    { type: 'MTRJ', icon: MTRJ },
    { type: 'MTRC', icon: MTRC },
    { type: 'MTTJ', icon: MTTJ },
    { type: 'MTTC', icon: MTTC },
    { type: 'MIRJ', icon: MIRJ },
    { type: 'MIRC', icon: MIRC },
    { type: 'MITJ', icon: MITJ },
    { type: 'MITC', icon: MITC },
  ];

  const styleBox = styleList.map((style) => (
    <Grid
      key={style.type}
      className={classes.box}
      onClick={() => handleClick(style.type)}
      item
      xs={3}
    >
      <style.icon />
      {style.type}
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
