/* eslint-disable camelcase */
/* eslint-disable func-names */
import React from 'react';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ReactComponent as Image_1 } from './TypeIcons/icons8-jasper-universe.svg';
import { ReactComponent as Image_2 } from './TypeIcons/icons8-brutus.svg';
import { ReactComponent as Image_3 } from './TypeIcons/icons8-cyborg.svg';
import { ReactComponent as Image_4 } from './TypeIcons/icons8-cylon-head-new.svg';

import { ReactComponent as Image_5 } from './TypeIcons/icons8-garnet-universe.svg';
import { ReactComponent as Image_6 } from './TypeIcons/icons8-greg-universe.svg';
import { ReactComponent as Image_7 } from './TypeIcons/icons8-ice-king.svg';
import { ReactComponent as Image_8 } from './TypeIcons/icons8-iron-man.svg';

import { ReactComponent as Image_9 } from './TypeIcons/icons8-joe-pineapples.svg';
import { ReactComponent as Image_10 } from './TypeIcons/icons8-joker-dc.svg';
import { ReactComponent as Image_11 } from './TypeIcons/icons8-mongrol.svg';
import { ReactComponent as Image_12 } from './TypeIcons/icons8-morpheus.svg';

import { ReactComponent as Image_13 } from './TypeIcons/icons8-mr.-hustler-robot.svg';
import { ReactComponent as Image_14 } from './TypeIcons/icons8-ruby-universe.svg';
import { ReactComponent as Image_15 } from './TypeIcons/icons8-walter-white.svg';
import { ReactComponent as Image_16 } from './TypeIcons/icons8-yoda.svg';

const selectTypeIcon = function (type) {
  /*
    U-M : User Frienly - Machine Efficiency
    T-I : Time Complexity - Intutive Code
    R-T : Rabbit - Turtle
    J-C : Just type - Carefully type

    U or M
          - T
            - R
              - J  [ UTRJ ]  [ MTRJ ]
              - C  [ UTRC ]  [ MTRC ]
            - T
              - J  [ UTTJ ]  [ MTTJ ]
              - C  [ UTTC ]  [ MTTC ]
          - I
            - R
              - J  [ UIRJ ]  [ MIRJ ]
              - C  [ UIRC ]  [ MIRC ]
            - T
              - J  [ UITJ ]  [ MITJ ]
              - C  [ UITC ]  [ MITC ]
  */
  switch (type) {
    case 'UTRJ':
      return {
        Icon: Image_1,
        title: 'title 1',
        subtitle: 'subtitle 1',
      };
    case 'UTRC':
      return {
        Icon: Image_2,
        title: 'title 2',
        subtitle: 'subtitle 2',
      };
    case 'UTTJ':
      return {
        Icon: Image_3,
        title: 'title 3',
        subtitle: 'subtitle 3',
      };
    case 'UTTC':
      return {
        Icon: Image_4,
        title: 'title 4',
        subtitle: 'subtitle 4',
      };
    case 'UIRJ':
      return {
        Icon: Image_5,
        title: 'title 5',
        subtitle: 'subtitle 5',
      };
    case 'UIRC':
      return {
        Icon: Image_6,
        title: 'title 6',
        subtitle: 'subtitle 6',
      };
    case 'UITJ':
      return {
        Icon: Image_7,
        title: 'title 7',
        subtitle: 'subtitle 7',
      };
    case 'UITC':
      return {
        Icon: Image_8,
        title: 'title 8',
        subtitle: 'subtitle 8',
      };
    case 'MTRJ':
      return {
        Icon: Image_9,
        title: 'title 9',
        subtitle: 'subtitle 9',
      };
    case 'MTRC':
      return {
        Icon: Image_10,
        title: 'title 10',
        subtitle: 'subtitle 10',
      };
    case 'MTTJ':
      return {
        Icon: Image_11,
        title: 'title 11',
        subtitle: 'subtitle 11',
      };
    case 'MTTC':
      return {
        Icon: Image_12,
        title: 'title 12',
        subtitle: 'subtitle 12',
      };
    case 'MIRJ':
      return {
        Icon: Image_13,
        title: 'title 13',
        subtitle: 'subtitle 13',
      };
    case 'MIRC':
      return {
        Icon: Image_14,
        title: 'title 14',
        subtitle: 'subtitle 14',
      };
    case 'MITJ':
      return {
        Icon: Image_15,
        title: 'title 15',
        subtitle: 'subtitle 15',
      };
    case 'MITC':
      return {
        Icon: Image_16,
        title: 'title 16',
        subtitle: 'subtitle 16',
      };
    default:
      return {
        Icon: Image_16,
        title: 'title 16',
        subtitle: 'subtitle 16',
      };
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
      <Box className={clsx(classes.animatedItem)} align="center">
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
