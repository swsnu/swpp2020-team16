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
    T-I : time Complexity - Intutive Code
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
        title: 'Great Supporter',
        subtitle: 'write code in user friendly way, care about time Complexity, solve the problem wisely, and know the way to get things done quickly.',
      };
    case 'UTRC':
      return {
        Icon: UTRC,
        title: 'Furious Teacher',
        subtitle: 'write code in user friendly way, care about time Complexity, solve the problem wisely, and carefully.',
      };
    case 'UTTJ':
      return {
        Icon: UTTJ,
        title: 'Great Helper',
        subtitle: 'write code in user friendly way, care about time Complexity, solve the problem honestly, and know the way to get things done quickly.',
      };
    case 'UTTC':
      return {
        Icon: UTTC,
        title: 'king of clean code',
        subtitle: 'write code in user friendly way, care about time Complexity, solve the problem honestly, and carefully.',
      };
    case 'UIRJ':
      return {
        Icon: UIRJ,
        title: 'Fast Code Writer',
        subtitle: 'write code in user friendly way, does not care about time Complexity, solve the problem wisely, and know the way to get things done quickly.',
      };
    case 'UIRC':
      return {
        Icon: UIRC,
        title: 'Why so serious about code?',
        subtitle: 'write code in user friendly way, does not care about time Complexity, solve the problem wisely, and carefully.',
      };
    case 'UITJ':
      return {
        Icon: UITJ,
        title: 'Write. Or write not. There is no think.',
        subtitle: 'write code in user friendly way, does not care about time Complexity, solve the problem honestly, and know the way to get things done quickly.',
      };
    case 'UITC':
      return {
        Icon: UITC,
        title: 'Code Sniper',
        subtitle: 'write code in user friendly way, does not care about time Complexity, solve the problem honestly, and carefully.',
      };
    case 'MTRJ':
      return {
        Icon: MTRJ,
        title: 'I code like Cyborg',
        subtitle:
          'write code in machine friendly way, care about time Complexity, solve the problem wisely and know the way to get things done quickly.',
      };
    case 'MTRC':
      return {
        Icon: MTRC,
        title: 'I code like Ice Man',
        subtitle:
          'write code in machine friendly way, care about time Complexity, solve the problem wisely, and carefully.',
      };
    case 'MTTJ':
      return {
        Icon: MTTJ,
        title: "I'm code devourer",
        subtitle:
          'write code in machine friendly way, care about time Complexity, solve the problem honestly and know the way to get things done quickly.',
      };
    case 'MTTC':
      return {
        Icon: MTTC,
        title: 'I code like NEO.',
        subtitle:
          'write code in machine friendly way, care about time Complexity, solve the problem honestly and carefully.',
      };
    case 'MIRJ':
      return {
        Icon: MIRJ,
        title: 'I code like Iron Man',
        subtitle:
          'write code in machine friendly way, does not care about time Complexity, solve the problem wisely and know the way to get things done quickly.',
      };
    case 'MIRC':
      return {
        Icon: MIRC,
        title: 'I code like Robot',
        subtitle:
          'write code in machine friendly way, does not care about time Complexity, solve the problem wisely and carefully',
      };
    case 'MITJ':
      return {
        Icon: MITJ,
        title: 'I code like Soldier',
        subtitle:
          'write code in machine friendly way, does not care about time Complexity, solve the problem honestly and know the way to get things done quickly.',
      };
    case 'MITC':
      return {
        Icon: MITC,
        title: 'Write Code, Run! Write more code, Run!',
        subtitle:
          'write code in machine friendly way, does not care about time Complexity, solve the problem honestly and carefully.',
      };
    default:
      return {
        Icon: MITC,
        title: 'I code like Soldier',
        subtitle: 'write code in machine friendly way, does not care about time Complexity, solve the problem honestly and know the way to get things done quickly.',
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
        <br />
        {title}
        <br />
        <br />
        {subtitle}
      </Box>
    </>
  );
}

TypeInfo.propTypes = {
  type: PropTypes.string.isRequired,
};
