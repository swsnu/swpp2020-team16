import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

export default function InvitationCreate(props) {
    const { createInvitation, groupId } = props;

    const createInvitationWithId = () => {
        const id = prompt('Inviation receiver Id?');
        createInvitation(groupId, { receiver: id });
    };

    return (
        <Button onClick={createInvitationWithId}>
            Invite
        </Button>
    );
}

InvitationCreate.propTypes = {
    createInvitation: PropTypes.func.isRequired,
    groupId: PropTypes.number.isRequired,
};
