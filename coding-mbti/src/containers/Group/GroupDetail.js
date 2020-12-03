import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

/* M-UIs */
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import {
  readMember, deleteMember, createGroup
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
      role, groups, members, deleteMember
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
              groupId={groupId}
              members={members}
              deleteMember={deleteMember}
            />
          </Grid>
        </Grid>
        <GroupDetailNavbar />

        {/*
            만약 내 그룹이 없다면,
          ㅇ    - 그룹 추가하기 버튼 클릭이 메인에 와야 한다.
          ㅇ    - 그룹 추가하기 버튼을 누르면,
          ㅇ      - 내가 가지고 있는 role이 메니저인지 아닌지 확인해야 한다.
          ㅇ        - 만약 매니저 role이 없다면,
          ㅇ          - 나는 alarm을 받는다. 매니저로 승격하라고.
                    - modal이 뜨면서, 돈 내고 매니저 하라는 글을 보여준다.
          ㅇ        - 만약 매니저 role이 있다면,
          ㅇ          - 그룹명을 작성함으로써, 그룹 하나를 생성할 수 있다.
                      - 만약 사람을 초대한다면,
                        - 그 사람에게는 메시지가 가야 한다.
                        - 그 사람에게는 메일이 가야 한다.
         */}
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
};

const mapStateToProps = (state) => ({
  role: state.user.userSignReducer.role,
  groups: state.group.groupReducer.groups,
  members: state.group.groupReducer.members,
  error: state.group.groupReducer.error,
});

export default connect(mapStateToProps, {
  readMember, deleteMember, createInvitation, createGroup
})(GroupDetail);
