import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

export default function MemberDelete(props) {
    const { groupId, userId, deleteMember } = props;
    console.log(deleteMember);
    return (
        <Button onClick={() => deleteMember(groupId, userId)}>
            Member Delete
        </Button>
    );
}

MemberDelete.propTypes = {
    userId: PropTypes.number.isRequired,
    groupId: PropTypes.number.isRequired,
    deleteMember: PropTypes.func.isRequired,
};
