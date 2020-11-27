import React from 'react';
import PropTypes from 'prop-types';

import { ListItem } from '@material-ui/core';

export default function GroupDelete(props) {
    const { groupId, deleteGroup } = props;
    return (
      <ListItem button onClick={() => deleteGroup(groupId)}>
        Delete
      </ListItem>
    );
}

GroupDelete.propTypes = {
    groupId: PropTypes.number.isRequired,
    deleteGroup: PropTypes.func.isRequired,
};
