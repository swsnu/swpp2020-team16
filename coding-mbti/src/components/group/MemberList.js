/* eslint-disable react/jsx-indent */
import React from 'react';
import PropTypes from 'prop-types';

import {
    Paper, Table, TableHead, TableBody, TableCell
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

import InvitationCreate from './InvitationCreate';
import MemberDelete from './MemberDelete';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function MemberList(props) {
    const {
        members, deleteMember, createInvitation, groupId
    } = props;
    const classes = useStyles();

    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Style</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.values(members).map(({ id, name, style }) => (
                            <TableRow key={id}>
                                <TableCell component="th" scope="row">{name}</TableCell>
                                <TableCell>{style}</TableCell>
                                <TableCell><MemberDelete userId={id} groupId={groupId} deleteMember={deleteMember} /></TableCell>
                                <TableCell><InvitationCreate userId={id} createInvitation={createInvitation} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

MemberList.propTypes = {
    groupId: PropTypes.number.isRequired,
    members: PropTypes.object.isRequired,
    deleteMember: PropTypes.func.isRequired,
    createInvitation: PropTypes.func.isRequired,
};
