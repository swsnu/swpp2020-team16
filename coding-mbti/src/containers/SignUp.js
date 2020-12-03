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
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { signUp } from '../feature/user/userSignSlice';

const roles = [
  {
    value: 1,
    label: 'Coder',
  },
  {
    value: 2,
    label: 'Manager',
  },
  {
    value: 3,
    label: 'Researcher',
  },
];

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailValidation: true,
      username: '',
      usernameValidation: true,
      password: '',
      passwordValidation: true,
      passwordCheck: '',
      passwordCheckValidation: true,
      role: 1,
      permissionCode: ''
    };
  }

  validateEmail = () => {
    const emailRegExp = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
    if (this.state.email.match(emailRegExp)) {
      this.setState({
        emailValidation: true,
      });
    } else {
      this.setState({
        emailValidation: false,
      });
    }
  };

  validateUsername = () => {
    if (this.state.username.length >= 8) {
      this.setState({
        usernameValidation: true,
      });
    } else {
      this.setState({
        usernameValidation: false,
      });
    }
  };

  validatePassword = () => {
    if (this.state.password.length >= 8) {
      this.setState({
        passwordValidation: true,
      });
    } else {
      this.setState({
        passwordValidation: false,
      });
    }
  };

  validatePasswordCheck = () => {
    if (this.state.passwordCheck >= 8 &&
      this.state.passwordCheck === this.state.password) {
      this.setState({
        passwordCheckValidation: true,
      });
    } else {
      this.setState({
        passwordCheckValidation: false,
      });
    }
  };

  clickSignUp = async () => {
    await Promise.all([
      this.validateEmail(),
      this.validateUsername(),
      this.validatePassword(),
      this.validatePasswordCheck()
    ]);

    if (!(this.state.emailValidation && this.state.usernameValidation &&
      this.state.passwordValidation && this.state.passwordCheckValidation)) {
      this.props.alert.show('invalid inputs');
      return;
    }

    let code = '';
    if (this.state.role === 2) {
      code = 'manager-permission-code';
    } else if (this.state.role === 3) {
      code = 'researcher-permission-code';
    }
    if (this.state.role !== 1 && this.state.permissionCode !== code) {
      this.props.alert.show('invalid permission code');
      return;
    }

    try {
      await this.props.signUp({
        email: this.state.email,
        password: this.state.password,
        role: this.state.role,
        username: this.state.username
      });
    } catch (error) {
      this.props.alert.show(error.message);
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" className="signup">
              Sign up
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    error={!this.state.usernameValidation}
                    id="username"
                    label="username"
                    onChange={(event) => this.setState({ username: event.target.value }, this.validateUsername)}
                    helperText={!this.state.usernameValidation ?
                      'username length must be at least 8' : ' '}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    error={!this.state.emailValidation}
                    id="email"
                    label="email address"
                    onChange={(event) => this.setState({ email: event.target.value }, this.validateEmail)}
                    helperText={!this.state.emailValidation ?
                      'email is not in valid format' : ' '}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    error={!this.state.passwordValidation}
                    label="password"
                    type="password"
                    id="password"
                    onChange={(event) => this.setState({ password: event.target.value }, this.validatePassword)}
                    helperText={!this.state.passwordValidation ?
                      'password length must be at least 8' : ' '}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    error={!this.state.passwordCheckValidation}
                    label="password check"
                    type="password"
                    id="passwordCheck"
                    onChange={(event) => this.setState({ passwordCheck: event.target.value }, this.validatePasswordCheck)}
                    helperText={!this.state.passwordCheckValidation ?
                      'should be the exact same password' : ' '}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="role"
                    select
                    fullWidth
                    label="role"
                    value={this.state.role}
                    onChange={(event) => this.setState({ role: event.target.value })}
                    helperText="Please select your role"
                  >
                    {roles.map((role) => (
                      <MenuItem key={role.value} value={role.value}>
                        {role.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                {
                  this.state.role === 1 ? '' : (
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="permission code"
                        id="permissionCode"
                        onChange={(event) => this.setState({ permissionCode: event.target.value })}
                      />
                    </Grid>
                  )
                }

              </Grid>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                id="sign_up_button"
                className={classes.submit}
                onClick={this.clickSignUp}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/signin/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </>
    );
  }
}
SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
  signUp: PropTypes.func.isRequired,
  alert: PropTypes.object.isRequired
};
const mapStateToProps = () => ({
});
export default connect(mapStateToProps, {
  signUp,
})(withStyles(styles)(withAlert()(SignUp)));
