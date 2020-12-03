import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  readInvitation, deleteInvitation, acceptInvitation
} from '../../feature/group/groupInvitationSlice';

import InvitationList from '../../components/group/InvitationList';

class Invitation extends Component {
  async componentDidMount() {
    this.props.readInvitation();
  }

  render() {
    const {
      invitation, acceptInvitation, deleteInvitation
    } = this.props;

    return (
      <div>
        <InvitationList
          invitation={invitation}
          deleteInvitation={deleteInvitation}
          acceptInvitation={acceptInvitation}
        />
        {console.log(invitation)}
      </div>
    );
  }
}

Invitation.propTypes = {
  invitation: PropTypes.object.isRequired,
  readInvitation: PropTypes.func.isRequired,
  acceptInvitation: PropTypes.func.isRequired,
  deleteInvitation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  invitation: state.group.groupInvitationReducer.invitation,
});

export default connect(mapStateToProps, {
  acceptInvitation, deleteInvitation, readInvitation
})(Invitation);
