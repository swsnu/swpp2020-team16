/* eslint-disable func-names */
import React from 'react';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ReactComponent as ImageOne } from './TypeIcons/icons8-jasper-universe.svg';

const selectTypeIcon = function (type) {
  switch (type) {
    case 'INTJ':
      return {
        Icon: ImageOne,
        title: '내가  그 유명한 하드코더다',
        subtitle: '시간 없으니 조용히 해라',
      };
    default:
      return ImageOne;
  }
};

const useStyles = makeStyles((theme) => ({
  animatedItem: {
    animation: `$myEffect 400ms ${theme.transitions.easing.easeInOut}`,
  },
  '@keyframes myEffect': {
    '0%': {
      opacity: 0,
      transform: 'translateY(-7%)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

export default function TypeInfo(props) {
  const { type } = props;
  const { Icon, title, subtitle } = selectTypeIcon(type);
  const classes = useStyles();
  return (
    <>
      <Box
        className={clsx(classes.animatedItem)}
      >
        <Icon />
        <br />
        {type}
        <br />
        {title}
        <br />
        {subtitle}
      </Box>
    </>
  );
}

TypeInfo.propTypes = {
  type: PropTypes.string.isRequired,
};
