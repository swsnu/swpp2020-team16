import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

export default function InvitationAccept(props) {
    const { invitationId, acceptInvitation } = props;
    const accpetAndReload = () => {
        acceptInvitation(invitationId);
        window.location.replace('/group');
    };

    return (
        <Button onClick={accpetAndReload}>
            Accept
        </Button>
    );
}

InvitationAccept.propTypes = {
    invitationId: PropTypes.number.isRequired,
    acceptInvitation: PropTypes.func.isRequired,
};
