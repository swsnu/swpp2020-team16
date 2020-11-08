/* eslint-disable func-names */
import React from 'react';

import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { ReactComponent as ImageOne } from './TypeIcons/icons8-jasper-universe.svg';

// const selectInfo = function (type) {
//   if (type === 'INTJ') {
//     return ImageOne;
//   }
//   return ImageOne;
// };

export default function TypeInfo(props) {
  const { type } = props;
  // const Image = selectInfo(type);
  // const Image = ImageOne;
  return (
    <>
      <Box bgcolor="lightblue">
        <ImageOne />
        <br />
        {type}
        <br />
        내가  그 유명한 하드코더다
        <br />
        시간없으니 조용히해라
      </Box>
    </>
  );
}

TypeInfo.propTypes = {
  type: PropTypes.string.isRequired,
};
