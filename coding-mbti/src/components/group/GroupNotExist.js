import React from 'react';
import PropTypes from 'prop-types';

/* M-UIs */
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

/* Components */
import GroupCreate from './GroupCreate';
import { ReactComponent as BackgroundImage2 } from './resources/teamwork.svg';

export default function GroupNotExist(props) {
  const { createGroup, error, isManager } = props;

  return (
    <>
      <div style={{ height: '25px' }} />
      <Container>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item>
            <BackgroundImage2 height="300px" width="500px" alt="tuvieja" />
          </Grid>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center" textAlign="center">
          <Grid item>
            <Typography variant="h3" component="h3">
              You have no groups.
            </Typography>
          </Grid>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center" textAlign="center">
          <Grid item>
            <Typography variant="h3" component="h3">
              Create Your Own Group!
            </Typography>
          </Grid>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center" textAlign="center">
          <Grid item>
            <GroupCreate createGroup={createGroup} error={error} isManager={isManager} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

GroupNotExist.propTypes = {
  createGroup: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  isManager: PropTypes.bool.isRequired,
};
