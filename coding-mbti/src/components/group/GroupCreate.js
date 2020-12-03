import React from 'react';
import PropTypes from 'prop-types';

/* M-UIs */
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useAlert } from 'react-alert';

export default function GroupCreate(props) {
  const alert = useAlert();
  const { createGroup, isManager } = props;

  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const handleClickOpen = () => {
    if (!isManager) {
      alert.show('Only manager can create groups.');
      return;
    }
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = async () => {
    const nameValid = name && name.trim() !== '';
    if (!nameValid) {
      alert.show('group name should not be null.');
      handleClose();
      return;
    }
    await createGroup({ name });

    alert.show('group is created!');
    handleClose();
  };

  return (
    <div>
      <Button
        variant="contained"
        size="large"
        color="primary"
        onClick={handleClickOpen}
      >
        Create Group!
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create Group</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your group name.
            <br />
            **All your managing group should have unique name.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="group name"
            fullWidth
            onChange={e => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

GroupCreate.propTypes = {
  createGroup: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  isManager: PropTypes.bool.isRequired,
};
