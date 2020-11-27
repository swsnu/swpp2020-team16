/* eslint-disable react/jsx-indent */
import React from 'react';
import PropTypes from 'prop-types';

import {
    Paper, Table, TableHead, TableBody, TableCell
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

import InvitationAccept from './InvitationAccept';
import InvitationDelete from './InvitationDelete';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function InvitationList(props) {
    const { invitations, deleteInvitation, acceptInvitation } = props;
    const classes = useStyles();

    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Sender</TableCell>
                            <TableCell>Group</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.values(invitations).map(({ id, sender, group }) => (
                            <TableRow key={id}>
                                <TableCell component="th" scope="row">{sender}</TableCell>
                                <TableCell>{group}</TableCell>
                                <TableCell><InvitationDelete invitaionId={id} deleteInvitation={deleteInvitation} /></TableCell>
                                <TableCell><InvitationAccept invitationId={id} acceptInvitation={acceptInvitation} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

InvitationList.propTypes = {
    invitations: PropTypes.object,
    deleteInvitation: PropTypes.func.isRequired,
    acceptInvitation: PropTypes.func.isRequired,
};

InvitationList.defaultProps = {
    invitations: {}
};
