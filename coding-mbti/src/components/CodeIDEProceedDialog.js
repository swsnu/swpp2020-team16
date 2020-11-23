import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export default function CodeIDEProceedDialog(props) {
  const { onClose, open, proceedSumbit } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">test case failures found.</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Would you force to proceed with your failures?
          <br />
          Your analysis might go astray. Recommend you to fix your errors.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus>
          Fix
        </Button>
        <Button
          onClick={() => {
            onClose();
            proceedSumbit();
          }}
          color="secondary"
        >
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CodeIDEProceedDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  proceedSumbit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
