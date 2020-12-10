/* eslint-disable react/jsx-indent */
import React from 'react';
import PropTypes from 'prop-types';

import {
  Paper, Table, TableHead, TableBody, TableCell
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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
  const { deleteInvitation, acceptInvitation } = props;
  const classes = useStyles();

  let { invitation } = props;
  const isInvitationDemo = Object.values(props.invitation).length === 0;
  if (isInvitationDemo) {
    const demoInvitation = {
      1: {
        id: 1, group: 'demo group SWPP', sender: 'demo sender team16'
      },
      2: {
        id: 2, group: 'demo group DC', sender: 'demo sender batman'
      },
      3: {
        id: 3, group: 'demo group marvel', sender: 'demo sender ironman'
      },
      4: {
        id: 4, group: 'demo group Amazon', sender: 'demo sender Jeff Bezos'
      },
    };
    invitation = demoInvitation;
  }

  function handleAccept() {
    if (isInvitationDemo) {
      window.alert('demo invitation accept.');
      return;
    }
    acceptInvitation();
  }

  function handleDelete() {
    if (isInvitationDemo) {
      window.alert('demo invitation delete.');
      return;
    }
    deleteInvitation();
  }

  return (
    <div>
      <Grid container spacing={6} className={classes.total}>
        <Grid item xs={12}>
          <Typography
            component="h1"
            variant="h1"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            My Invitations
          </Typography>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sender</TableCell>
              <TableCell>Group</TableCell>
              <TableCell>delete</TableCell>
              <TableCell>accept</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(invitation).map(({ id, sender, group }) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">{sender}</TableCell>
                <TableCell>{group}</TableCell>
                <TableCell>
                  <InvitationDelete
                    invitaionId={id}
                    deleteInvitation={handleDelete}
                  />
                </TableCell>
                <TableCell>
                  <InvitationAccept
                    invitationId={id}
                    acceptInvitation={handleAccept}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

InvitationList.propTypes = {
  invitation: PropTypes.object,
  deleteInvitation: PropTypes.func.isRequired,
  acceptInvitation: PropTypes.func.isRequired,
};

InvitationList.defaultProps = {
  invitation: {}
};
