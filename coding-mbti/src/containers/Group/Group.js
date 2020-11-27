import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  AppBar, Tab, Tabs, Box, Typography
} from '@material-ui/core';

import { withStyles } from '@material-ui/styles';
import { readGroup, createGroup, deleteGroup } from '../../feature/group/groupSlice';
import {
  readInvitation, createInvitation, deleteInvitation, acceptInvitation
} from '../../feature/group/groupInvitationSlice';

import GroupCreate from '../../components/group/GroupCreate';
import GroupView from '../../components/group/GroupView';
import InvitationList from '../../components/group/InvitationList';
import { isCoder, isManager } from '../../utils/role';

const styles = (theme) => ({
  tabPanel: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(10),
  }
});

const a11yProps = index => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

const TabPanel = ({
  children, value, index, ...other
}) => (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ position: 'absolute', top: '40px' }}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  async componentDidMount() {
    const { role } = this.props;
    if (isManager(role)) this.props.readGroup();
    else if (isCoder(role)) {
      this.props.readInvitation();
    }
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    const {
      role, classes, groups, invitation, error, createGroup, deleteGroup, acceptInvitation
    } = this.props;

    const isGroup = Object.keys(groups).length > 0 && isManager(role);
    const isCreateGroup = isManager(role);
    const isInvitations = Object.keys(invitation).length > 0;
    const isInvitationCreate = isManager(role);

    const { value } = this.state;

    return (
      <div>
        <AppBar postition="static" style={{ top: '60px', padding: '10px' }}>
          <Tabs value={value} onChange={this.handleChange} aria-label="Group Tabs">
            <Tab label="Create Group" {...a11yProps(0)} disabled={!isCreateGroup} />
            <Tab label="Group" {...a11yProps(0)} disabled={!isGroup} />
            <Tab label="Invitations" {...a11yProps(0)} disabled={!isInvitations} />
            <Tab label="Create Invitations" {...a11yProps(0)} disabled={!isInvitationCreate} />
          </Tabs>
        </AppBar>
        <TabPanel className={classes.tabPanel} value={value} index={0}>
          <GroupCreate createGroup={createGroup} error={error} />
        </TabPanel>
        <TabPanel className={classes.tabPanel} value={value} index={1}>
          <GroupView groups={groups} deleteGroup={deleteGroup} />
        </TabPanel>
        <TabPanel className={classes.tabPanel} value={value} index={2}>
          <InvitationList invitations={invitation} deleteInvitation={deleteInvitation} acceptInvitation={acceptInvitation} />
        </TabPanel>
      </div>
    );
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
})(withStyles(styles)(Group));
