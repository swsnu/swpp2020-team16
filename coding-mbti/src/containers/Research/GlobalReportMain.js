import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Redirect } from 'react-router';
import CreateGlobalReport from '../../components/Research/CreateGlobalReport';
import {
    readGlobalReport, createGlobalReport
} from '../../feature/report/reportSlice';

class GlobalReportMain extends Component {
    async componentDidMount() {
        this.props.readGlobalReport();
    }

    render() {
        const {
            globalReport, createGlobalReport, user
        } = this.props;

        if (user.role !== 3) {
            return <Redirect to="/" />;
        }

        return (
            <div>
                {JSON.stringify(globalReport)}
                <CreateGlobalReport createGlobalReport={createGlobalReport} />
            </div>
        );
    }
}

GlobalReportMain.propTypes = {
    readGlobalReport: PropTypes.func.isRequired,
    createGlobalReport: PropTypes.func.isRequired,
    globalReport: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    globalReport: state.report.reportReducer.globalReport,
    user: state.user.userSignReducer,
});

export default connect(mapStateToProps, {
    readGlobalReport, createGlobalReport
})(GlobalReportMain);
