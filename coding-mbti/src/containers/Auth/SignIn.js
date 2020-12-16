import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withAlert } from 'react-alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signIn, signOut, clearError } from '../../feature/user/userSignSlice';

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  clickSignIn = async () => {
    try {
      await this.props.signIn({ ...this.state });
    } catch (error) {
      this.props.alert.show(error.message);
    }
  };

  render() {
    const { alert, error, classes, clearError } = this.props;
    if (this.props.user.username !== null) {
      if (this.props.user.role === 1) {
        return <Redirect path="*" to="/beforesolve" />;
      }
      if (this.props.user.role === 2) {
        return <Redirect path="*" to="/group" />;
      }
      return <Redirect path="*" to="/research/api" />;
    }

    if (error) {
      alert.show(error);
      clearError();
    }
    return (
      <>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" className="signin">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="inputUsername"
                label="username"
                autoComplete="username"
                autoFocus
                value={this.state.username}
                onChange={(event) => this.setState({ username: event.target.value })}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="inputPassword"
                autoComplete="current-password"
                value={this.state.password}
                onChange={(event) => this.setState({ password: event.target.value })}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                id="sign_in_button"
                className={classes.submit}
                onClick={() => this.clickSignIn()}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs />
                <Grid item>
                  <Link href="/signup/" variant="body2">
                    Do not have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </form>
            <div style={{ height: '55px' }} />
          </div>
        </Container>
      </>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  alert: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.userSignReducer,
  error: state.user.userSignReducer.error,
});

export default connect(mapStateToProps, { signIn, signOut, clearError })(
  withStyles(styles)(withAlert()(SignIn))
);
