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

export default function MemberList(props) {
  const {
    groupId, members, deleteMember, detailMember
  } = props;
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h6" className={classes.title}>
        Group Coders
      </Typography>
      <div className={classes.paperBackground}>
        <List dense={false}>
          {
            Object.keys(members).map((member) => (
              <ListItem>
                <ListItemAvatar>
                  <Avatar alt={members[member].username.toUpperCase()} src="../nosrc" />
                </ListItemAvatar>
                <ListItemText
                  primary={members[member].username}
                  secondary={members[member].style.style_str === undefined ?
                    'did not solve over threshold(which is 3). no style info :(' :
                    members[member].style.style_str}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={detailMember}>
                    <InfoIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => deleteMember(groupId, members[member].user_id)}>
                    <DeleteForeverIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))

          }
        </List>
      </div>
    </div>
  );
}

MemberList.propTypes = {
  groupId: PropTypes.string.isRequired,
  members: PropTypes.object.isRequired,
  deleteMember: PropTypes.func.isRequired,
  detailMember: PropTypes.func.isRequired,
};
