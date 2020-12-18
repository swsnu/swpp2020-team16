import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* M-UIs */
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import Grid from '@material-ui/core/Grid';

import GroupCreate from './GroupCreate';
import GroupDelete from './GroupDelete';
// import GroupRelations from './GroupRelations';
import InvitationCreate from './InvitationCreate';

export default class GroupDetailNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'groupCreate'
    };
  }

  render() {
    const {
      groupId, deleteGroup, createGroup, error, isManager, createInvitation
    } = this.props;
    return (
      <>
        <BottomNavigation
          value={this.state.value}
          onChange={(event, newValue) => this.setState(prevState => ({ ...prevState, value: newValue }))}
        >
          <BottomNavigationAction label="Group Create" value="groupCreate" icon={<SupervisedUserCircleIcon />} />
          <BottomNavigationAction label="Group Delete" value="groupDelete" icon={<DeleteForeverIcon />} />
          <BottomNavigationAction label="Add User" value="inviteUser" icon={<PersonAddIcon />} />
        </BottomNavigation>
        <div style={{ height: '25px' }} />
        {
          this.state.value === 'groupCreate' ? (
            <Grid container direction="row" justify="center" alignItems="center" textAlign="center">
              <Grid item>
                <GroupCreate
                  createGroup={createGroup}
                  error={error}
                  isManager={isManager}
                />
              </Grid>
            </Grid>
          )
            : null
        }
        {
          this.state.value === 'groupDelete' ? (
            <Grid container direction="row" justify="center" alignItems="center" textAlign="center">
              <Grid item>
                <GroupDelete
                  groupId={groupId}
                  deleteGroup={deleteGroup}
                  error={error}
                  isManager={isManager}
                />
              </Grid>
            </Grid>
          )
            : null
        }
        {
          this.state.value === 'inviteUser' ? (
            <Grid container direction="row" justify="center" alignItems="center" textAlign="center">
              <Grid item>
                <InvitationCreate
                  groupId={groupId}
                  createInvitation={createInvitation}
                  isManager={isManager}
                />
              </Grid>
            </Grid>
          )
            : null
        }
      </>
    );
  }
}

GroupDetailNavbar.propTypes = {
  groups: PropTypes.object.isRequired,
  role: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  members: PropTypes.object.isRequired,
  createGroup: PropTypes.func.isRequired,
  deleteGroup: PropTypes.func.isRequired,
  readMember: PropTypes.func.isRequired,
  deleteMember: PropTypes.func.isRequired,
  createInvitation: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  isManager: PropTypes.bool.isRequired,
  groupId: PropTypes.string.isRequired,
};
