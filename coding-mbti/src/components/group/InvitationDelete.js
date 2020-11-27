import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

export default function InvitationDelete(props) {
    const { invitationId, deleteInvitation } = props;
    return (
        <Button onClick={() => deleteInvitation(invitationId)}>
            Delete
        </Button>
    );
}

InvitationDelete.propTypes = {
    invitationId: PropTypes.number.isRequired,
    deleteInvitation: PropTypes.func.isRequired,
};
