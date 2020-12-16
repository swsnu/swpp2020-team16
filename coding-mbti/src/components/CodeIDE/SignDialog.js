import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import { blue } from '@material-ui/core/colors';

const choices = ['Sign In', 'Sign Up'];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export default function SignDialog(props) {
  const history = useHistory();
  const classes = useStyles();
  const { onClose, open } = props;

  const handleListItemClick = (value) => {
    if (value === 'Sign In') {
      history.push('/signin');
    } else {
      history.push('/signup');
    }
    onClose();
  };

  return (
    <Dialog onClose={onClose} aria-labelledby="sign-dialog-title" open={open}>
      <DialogTitle id="sign-dialog-title">Need thorough analysis on your code?</DialogTitle>
      <List>
        {choices.map((choice) => (
          <ListItem id={`item ${choice}`} button onClick={() => handleListItemClick(choice)} key={choice}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={choice} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SignDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
