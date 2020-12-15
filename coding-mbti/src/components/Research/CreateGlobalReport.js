/* eslint-disable react/jsx-indent-props */
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

export default function CreateGlobalReport(props) {
    const alert = useAlert();
    const { createGlobalReport } = props;

    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleCreate = async () => {
        const titleValid = title && title.trim() !== '';
        if (!titleValid) {
            alert.show('Global Report title should not be null.');
            handleClose();
            return;
        }

        const contentValid = content && content.trim() !== '';
        if (!contentValid) {
            alert.show('Global Report content should not be null.');
            handleClose();
            return;
        }

        await createGlobalReport({ title, content });

        alert.show('Global Report is created!');
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
                Create Report!
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create Report</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter your Report title, content.
            <br />
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="group title"
                        fullWidth
                        onChange={e => setTitle(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="content"
                        label="report content"
                        fullWidth
                        onChange={e => setContent(e.target.value)}
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

CreateGlobalReport.propTypes = {
    createGlobalReport: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
};
