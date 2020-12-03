import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

/* M-UIs */
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

/* Components */
import GroupCreate from './GroupCreate';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function GroupList(props) {
  const classes = useStyles();
  const history = useHistory();

  const {
    groups, createGroup, deleteGroup, error, isManager
  } = props;

  return (
    <>
      <div style={{ height: '25px' }} />
      <Container>
        <Grid container direction="row" justify="center" alignItems="center" textAlign="center">
          <Grid item>
            <Typography variant="h3" component="h3">
              My Groups
            </Typography>
          </Grid>
        </Grid>
        <div style={{ height: '25px' }} />
        <List className={classes.root}>
          {
            Object.keys(groups).map((group, idx) => (
              <>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={groups[group].name.toUpperCase()} src="../nosrc" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={groups[group].name}
                    secondary={(
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          group of 5 members
                        </Typography>
                      </>
                    )}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="comments"
                      color="primary"
                      iconStyle={{
                        width: 60,
                        height: 60,
                      }}
                      onClick={() => history.push(`/group/detail/${group}`)}
                    >
                      <SupervisedUserCircleIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="comments"
                      color="secondary"
                      iconStyle={{
                        width: 80,
                        height: 80,
                      }}
                      onClick={() => { deleteGroup(groups[group].id); }}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                {
                  Object.keys(groups).length - 1 !== idx ?
                    <Divider variant="inset" component="li" />
                    : null
                }
              </>
            ))
          }
        </List>
        <div style={{ height: '25px' }} />
        <Grid container direction="row" justify="center" alignItems="center" textAlign="center">
          <Grid item>
            <GroupCreate createGroup={createGroup} error={error} isManager={isManager} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

GroupList.propTypes = {
  groupId: PropTypes.number.isRequired,
  deleteGroup: PropTypes.func.isRequired,
  groups: PropTypes.object.isRequired,
  createGroup: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  isManager: PropTypes.bool.isRequired,
};
