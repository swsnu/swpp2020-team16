import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  circle: {
    maring: theme.spacing(3),
    padding: theme.spacing(3),
    width: '10vw',
    height: '10vw',
    borderRadius: '100%',
    backgroundColor: 'rgba(0, 0, 0, .05)',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, .02)',
    },
  },
}));

const SingleUser = (props) => {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.circle}
      align="center"
      alignContent="center"
      onClick={() => {
        props.readOtherReport(props.user.user_id).then(() => {
          window.location.reload();
        });
      }}
      item
      xs={2}
    >
      <Grid item xs={12} className="forTest">
        {props.user.username}
      </Grid>
    </Grid>
  );
};

export default function FindCodersByStyle(props) {
  const sameStyleUsers = props.same.map((el) => (
    <SingleUser user={el} readOtherReport={props.readOtherReport} />
  ));
  return (
    <>
      <Grid item xs={1} className="findCoders" />
      <Grid item container spacing={3} xs={10}>
        <Grid item xs={12}>
          <Typography variant="h2" align="center">
            Same Style Users
          </Typography>
        </Grid>
        <Grid item container spacing={5} xs={12}>
          {sameStyleUsers}
        </Grid>
      </Grid>
      <Grid item xs={1} />
    </>
  );
}

SingleUser.propTypes = {
  user: PropTypes.object.isRequired,
  readOtherReport: PropTypes.object.isRequired,
};
FindCodersByStyle.propTypes = {
  readUsersByStyle: PropTypes.object.isRequired,
  same: PropTypes.object.isRequired,
  opposite: PropTypes.object.isRequired,
  report: PropTypes.object.isRequired,
  readOtherReport: PropTypes.object.isRequired,
};

FindCodersByStyle.defaultProps = {};
