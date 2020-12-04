import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

/* M-UIs */
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import {
  readMember, deleteMember, createGroup, deleteGroup
} from '../../feature/group/groupSlice';
import { createInvitation } from '../../feature/group/groupInvitationSlice';

/* Components */
import MemberList from '../../components/group/MemberList';
import GroupDetailNavbar from '../../components/group/GroupDetailNavbar';

/* UTILs */
import { isManager } from '../../utils/role';

class GroupDetail extends Component {
  async componentDidMount() {
    const { groupId } = this.props.match.params;
    this.props.readMember(groupId);
  }

  render() {
    const {
      role, groups, members, createInvitation, deleteMember, createGroup, deleteGroup, error
    } = this.props;

    const { groupId } = this.props.match.params;
    const group = groups[groupId];

    if (!isManager(role)) {
      return <Redirect path="*" to="/group" />;
    }

    return (
      <Container>
        <div style={{ height: '25px' }} />
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          textAlign="center"
        >
          <Grid item>
            <Typography variant="h3" component="h3">
              Group Analysis On
                {' '}
              {group.name}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <MemberList
              members={members}
              deleteMember={deleteMember}
              detailMember={() => <Redirect path="*" to="/my/tests/results" />}
            />
          </Grid>
        </Grid>
        <GroupDetailNavbar
          groupId={groupId}
          createGroup={createGroup}
          deleteGroup={deleteGroup}
          createInvitation={createInvitation}
          error={error}
          isManager={isManager(role)}
        />
      </Container>
    );
  }
}

GroupDetail.propTypes = {
  groups: PropTypes.object.isRequired,
  role: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  members: PropTypes.object.isRequired,
  readMember: PropTypes.func.isRequired,
  deleteMember: PropTypes.func.isRequired,
  createInvitation: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  createGroup: PropTypes.func.isRequired,
  deleteGroup: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  role: state.user.userSignReducer.role,
  groups: state.group.groupReducer.groups,
  members: state.group.groupReducer.members,
  error: state.group.groupReducer.error,
});

export default connect(mapStateToProps, {
  readMember, deleteMember, createInvitation, createGroup, deleteGroup
})(GroupDetail);
