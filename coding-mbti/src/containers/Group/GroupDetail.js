import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/styles';
import { Redirect } from 'react-router';
import { readMember, deleteMember } from '../../feature/group/groupSlice';

import InvitationCreate from '../../components/group/InvitationCreate';
import MemberList from '../../components/group/MemberList';
import { isManager } from '../../utils/role';

const styles = (theme) => ({
    tabPanel: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(10),
    }
});

class GroupDetail extends Component {
    async componentDidMount() {
        const { groupId } = this.props.match.params;
        this.props.readMember(groupId);
    }

    render() {
        const {
            role, classes, groups, members, error, createInvitation, deleteMember
        } = this.props;

        const { groupId } = this.props.match.params;
        const group = groups[groupId];

        if (isManager(role)) {
            return (
                <div>
                    Group Analysis
                    <h3>
                        {group.name}
                    </h3>
                    <MemberList groupId={groupId} members={members} deleteMember={deleteMember} />
                    <InvitationCreate classeName={classes.tabPanel} createInvitaion={createInvitation} gruopId={groupId} />
                </div>
            );
        }
        return (<Redirect to="/" />);
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
};

const mapStateToProps = (state) => ({
    role: state.user.userSignReducer.role,
    groups: state.group.groupReducer.groups,
    members: state.group.groupReducer.members,
    error: state.group.groupReducer.error,
});

export default connect(mapStateToProps, { readMember, deleteMember })(withStyles(styles)(GroupDetail));
