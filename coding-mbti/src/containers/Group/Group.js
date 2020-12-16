import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  readInvitation, createInvitation, acceptInvitation
} from '../../feature/group/groupInvitationSlice';
import { readGroup, createGroup, deleteGroup } from '../../feature/group/groupSlice';
import GroupNotExist from '../../components/group/GroupNotExist';
import GroupList from '../../components/group/GroupList';
import { isCoder, isManager } from '../../utils/role';

class Group extends Component {
  async componentDidMount() {
    const { role } = this.props;
    if (isManager(role)) this.props.readGroup();
  }

  render() {
    const {
      role, groups, error, createGroup, deleteGroup,
    } = this.props;

    const noGroup = Object.keys(groups).length === 0;
    const isManagerOfGroup = Object.keys(groups).length > 0 && isManager(role);
    const isMemberOfGroup = Object.keys(groups).length > 0 && isCoder(role);

    if (noGroup) {
      return (
        <div>
          <GroupNotExist
            createGroup={createGroup}
            error={error}
            isManager={isManager(role)}
          />
        </div>
      );
    }

    if (isManagerOfGroup) {
      return (
        <div>
          <GroupList
            groups={groups}
            createGroup={createGroup}
            deleteGroup={deleteGroup}
            error={error}
            isManager={isManager(role)}
          />
        </div>
      );
    }

    if (isMemberOfGroup) {
      return (
        <div>
          <GroupList
            groups={groups}
            createGroup={createGroup}
            deleteGroup={deleteGroup}
            error={error}
            isManager={isManager(role)}
          />
        </div>
      );
    }

    return null;
  }
}

Group.propTypes = {
  role: PropTypes.object.isRequired,
  groups: PropTypes.object.isRequired,
  invitation: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  createGroup: PropTypes.func.isRequired,
  readGroup: PropTypes.func.isRequired,
  deleteGroup: PropTypes.func.isRequired,
  readInvitation: PropTypes.func.isRequired,
  acceptInvitation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  role: state.user.userSignReducer.role,
  groups: state.group.groupReducer.groups,
  members: state.group.groupReducer.members,
  error: state.group.groupReducer.error,
  invitation: state.group.groupInvitationReducer.invitation,
});

export default connect(mapStateToProps, {
  readGroup, createGroup, deleteGroup, readInvitation, createInvitation, acceptInvitation,
})(Group);
