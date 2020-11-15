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
import Navbar from '../components/Navbar';
import { signUp } from '../feature/user/userSignupSlice';

const usertypes = [
  {
    value: 'CODER',
    label: 'Coder',
  },
  {
    value: 'REASERCHER',
    label: 'Researcher',
  },
  {
    value: 'MANAGER',
    label: 'Manager',
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
      userName: '',
      password: '',
      passwordCheck: '',
      userType: 'CODER',
    };
  }

  clickSignUp = () => {
    if (
      this.state.userName === '' ||
      this.state.email === '' ||
      this.state.password === '' ||
      this.state.passwordCheck === ''
    ) {
      alert('Empty Field Exists');
    } else if (this.state.passwordCheck !== this.state.password) {
      alert('Password Validation Failed.');
    } else {
      this.props.signUp({
        email: this.state.email,
        password: this.state.password,
        userType: this.state.userType,
        userName: this.state.userName,
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Navbar />
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
                    id="userName"
                    label="UserName"
                    onChange={(event) => this.setState({ userName: event.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    onChange={(event) => this.setState({ email: event.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    onChange={(event) => this.setState({ password: event.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Password Check"
                    type="password"
                    id="passwordCheck"
                    onChange={(event) => this.setState({ passwordCheck: event.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="userType"
                    select
                    fullWidth
                    label="user type"
                    onChange={(event) => this.setState({ userType: event.target.value })}
                    helperText="Please select your user type"
                  >
                    {usertypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                id="sign_up_button"
                className={classes.submit}
                onClick={() => this.clickSignUp()}
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
  user: PropTypes.object.isRequired,
  signUp: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user.userReducer[1],
});
export default connect(mapStateToProps, {
  signUp,
})(withStyles(styles)(withAlert()(SignUp)));
