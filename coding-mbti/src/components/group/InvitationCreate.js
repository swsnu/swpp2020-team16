import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useAlert } from 'react-alert';

export default function InvitationCreate(props) {
  const alert = useAlert();

  const { createInvitation, groupId, isManager } = props;

  const [open, setOpen] = React.useState(false);
  const [coderId, setCoderId] = React.useState('');

  const handleClickOpen = () => {
    if (!isManager) {
      alert.show('Only manager can invite coders.');
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createInvitationWithId = async () => {
    await createInvitation({ group_id: groupId, receiver: coderId });
    alert.show(`invitation sent to the coder [${coderId}]`);
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        size="large"
        color="primary"
        onClick={handleClickOpen}
      >
        Invite Coder!
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Invite coder</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter inviting coder id
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="coder id"
            fullWidth
            onChange={e => setCoderId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button id="InvitationStart" onClick={createInvitationWithId} color="primary">
            Invite
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

InvitationCreate.propTypes = {
  createInvitation: PropTypes.func.isRequired,
  groupId: PropTypes.string.isRequired,
  isManager: PropTypes.bool.isRequired,
};
