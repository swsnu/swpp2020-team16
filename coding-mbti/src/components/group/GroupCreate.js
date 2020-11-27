import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

export default function GroupCreate(props) {
  const { createGroup, error } = props;

  const getName = async () => {
    const name = prompt('Input Group Name');
    if (name && name.trim() === '') {
      getName();
    }
    await createGroup({ name });
    if (error && name) {
      alert(error);
      getName();
    }
  };

  return (
    <Button onClick={getName}>
      Create
    </Button>
  );
}

GroupCreate.propTypes = {
  createGroup: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired
};
