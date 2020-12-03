/* eslint-disable react/jsx-indent */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  paperBackground: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  table: {
    minWidth: 650,
  },
}));

export default function MemberList() {
  const classes = useStyles();
  const [dense] = React.useState(false);
  const [secondary] = React.useState(false);

  function generate(element) {
    return [0, 1, 2].map((value) => React.cloneElement(element, {
      key: value,
    }));
  }

  return (
    <div>
      <Typography variant="h6" className={classes.title}>
        Group Coders
      </Typography>
      <div className={classes.paperBackground}>
        <List dense={dense}>
          {generate(
            <ListItem>
              <ListItemAvatar>
                <Avatar alt="A" src="../nosrc" />
              </ListItemAvatar>
              <ListItemText
                primary="Single-line item"
                secondary={secondary ? 'Secondary text' : null}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <InfoIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete">
                  <DeleteForeverIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>,
          )}
        </List>
      </div>
    </div>
  );
}

MemberList.propTypes = {
  groupId: PropTypes.number.isRequired,
  members: PropTypes.object.isRequired,
  deleteMember: PropTypes.func.isRequired,
  createInvitation: PropTypes.func.isRequired,
};
