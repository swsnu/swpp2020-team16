import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* M-UIs */
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import AssignmentIcon from '@material-ui/icons/Assignment';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';

export default class GroupDetailNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'recent'
        };
    }

    handleChange = (event, newValue) => {
        this.setState(prevState => ({ ...prevState, value: newValue }));
    };

    render() {
        return (
            <BottomNavigation value={this.state.value} onChange={this.handleChange}>
                <BottomNavigationAction label="Group Create" value="create" icon={<SupervisedUserCircleIcon />} />
                <BottomNavigationAction label="Group Delete" value="delete" icon={<DeleteForeverIcon />} />
                <BottomNavigationAction label="Group Test" value="groupTest" icon={<AssignmentIcon />} />
                <BottomNavigationAction label="Group Relations" value="groupRelations" icon={<RecordVoiceOverIcon />} />
                <BottomNavigationAction label="Add User" value="addUser" icon={<PersonAddIcon />} />
                <BottomNavigationAction label="Delete User" value="deleteUser" icon={<PersonAddDisabledIcon />} />
            </BottomNavigation>
        );
    }
}

GroupDetailNavbar.propTypes = {
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
