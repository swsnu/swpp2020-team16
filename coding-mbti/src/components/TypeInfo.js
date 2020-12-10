/* eslint-disable camelcase */
/* eslint-disable func-names */
import React from 'react';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';

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

const selectTypeIcon = function (type) {
  /*
    U-M : User Friendly - Machine Efficiency
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
        Icon: UTRJ,
        title: 'title 1',
        subtitle: 'subtitle 1',
      };
    case 'UTRC':
      return {
        Icon: UTRC,
        title: 'title 2',
        subtitle: 'subtitle 2',
      };
    case 'UTTJ':
      return {
        Icon: UTTJ,
        title: 'title 3',
        subtitle: 'subtitle 3',
      };
    case 'UTTC':
      return {
        Icon: UTTC,
        title: 'title 4',
        subtitle: 'subtitle 4',
      };
    case 'UIRJ':
      return {
        Icon: UIRJ,
        title: 'title 5',
        subtitle: 'subtitle 5',
      };
    case 'UIRC':
      return {
        Icon: UIRC,
        title: 'title 6',
        subtitle: 'subtitle 6',
      };
    case 'UITJ':
      return {
        Icon: UITJ,
        title: 'title 7',
        subtitle: 'subtitle 7',
      };
    case 'UITC':
      return {
        Icon: UITC,
        title: 'title 8',
        subtitle: 'subtitle 8',
      };
    case 'MTRJ':
      return {
        Icon: MTRJ,
        title: 'Cyborg',
        subtitle:
          'write code in machine friendly way, care about Time complexity, solve the problem wisely and know the way to get things done quickly.',
      };
    case 'MTRC':
      return {
        Icon: MTRC,
        title: 'Ice Man',
        subtitle:
          'write code in machine friendly way, care about Time complexity, solve the problem wisely, and carefully.',
      };
    case 'MTTJ':
      return {
        Icon: MTTJ,
        title: 'Orange Man',
        subtitle:
          'write code in machine friendly way, care about Time complexity, solve the problem honestly and know the way to get things done quickly.',
      };
    case 'MTTC':
      return {
        Icon: MTTC,
        title: 'Matrix Man',
        subtitle:
          'write code in machine friendly way, care about Time complexity, solve the problem honestly and carefully.',
      };
    case 'MIRJ':
      return {
        Icon: MIRJ,
        title: 'Iron Man',
        subtitle:
          'write code in machine friendly way, does not care about Time complexity, solve the problem wisely and know the way to get things done quickly.',
      };
    case 'MIRC':
      return {
        Icon: MIRC,
        title: 'Robot',
        subtitle:
          'write code in machine friendly way, does not care about Time complexity, solve the problem wisely and carefully',
      };
    case 'MITJ':
      return {
        Icon: MITJ,
        title: 'Tin woodcutter',
        subtitle:
          'write code in machine friendly way, does not care about Time complexity, solve the problem honestly and know the way to get things done quickly.',
      };
    case 'MITC':
      return {
        Icon: MITC,
        title: 'Soldier',
        subtitle:
          'write code in machine friendly way, does not care about Time complexity, solve the problem honestly and carefully.',
      };
    default:
      return {
        Icon: MITC,
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
      <Box className={clsx(classes.animatedItem)}>
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
