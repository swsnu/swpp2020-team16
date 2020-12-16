import React from 'react';
import PropTypes from 'prop-types';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function GroupDelete(props) {
  const alert = useAlert();
  const history = useHistory();
  const { groupId, deleteGroup, isManager } = props;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    if (!isManager) {
      alert.show('Only manager can delete groups.');
      return;
    }
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    deleteGroup(groupId);
    history.push('/group');
  };

  return (
    <>
      <Button
        id="GroupDeleteStart"
        variant="contained"
        size="large"
        color="primary"
        onClick={handleClickOpen}
      >
        Delete Group!
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Delete Group</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You really want to delete this group?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button id="GroupDelete" onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

GroupDelete.propTypes = {
  groupId: PropTypes.string.isRequired,
  deleteGroup: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  isManager: PropTypes.bool.isRequired,
};
