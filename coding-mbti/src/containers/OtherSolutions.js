import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { readUsersByStyle } from '../feature/user/userSlice';
import { readSolutionOfOthers } from '../feature/problem/solutionSlice';
import OtherSolutionsTable from '../components/OtherSolutionsTable';
import { withStyles } from '@material-ui/styles';

const styleToIntDict = {
  UTEJ: 1,
  UTEC: 2,
  UTFJ: 3,
  UTFC: 4,
  UIEJ: 5,
  UIEC: 6,
  UIFJ: 7,
  UIFC: 8,
  MTEJ: 9,
  MTEC: 10,
  MTFJ: 11,
  MTFC: 12,
  MIEJ: 13,
  EIEC: 14,
  MIFJ: 15,
  MIFC: 16,
};
const styles = (theme) => ({
  Page: {
    backgroundColor: 'white',
    padding: theme.spacing(8, 0, 6),
  },
});

let style = 1;
let pid = 1;
let users = { userList: [] };
let solList = [];

class OtherSolutions extends Component {
  async componentDidMount() {
    await this.props.readUsersByStyle(style);

    for (const user of this.props.users.userList) {
      this.props.readSolutionOfOthers(user.user_id, pid).then((res) => {
        solList.push(res);
      });
    }
  }

  render() {
    const mapStyleToInt = (style) => {
      return styleToIntDict[style];
    };
    const { classes } = this.props;
    const styleInt = mapStyleToInt(this.props.match.params.style);
    const styleStr = this.props.match.params.style;
    users = this.props.users;
    pid = this.props.match.params.pid;

    return (
      <Grid container className={classes.Page} maxWidth="lg">
        <Grid item align="center" xs={12}>
          <h1>{`solutions of ${styleStr} coders for problem ${pid}`}</h1>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid container item xs={8}>
          <OtherSolutionsTable
            userList={users.userList}
            solList={solList}
            pid={pid}
          />
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    );
  }
}

OtherSolutions.propTypes = {};

OtherSolutions.defaultProps = {};

const mapDispatchToProps = (state) => ({
  users: state.user.userReducer,
});

export default connect(mapDispatchToProps, {
  readUsersByStyle,
  readSolutionOfOthers,
})(withStyles(styles)(OtherSolutions));
