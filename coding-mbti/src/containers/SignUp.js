import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";
import Navbar from "../components/Navbar";

const usertypes = [
  {
    value: "CODER",
    label: "Coder",
  },
  {
    value: "REASERCHER",
    label: "Researcher",
  },
  {
    value: "MANAGER",
    label: "Manager",
  },
];
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [password_check, setPasswordCheck] = useState("");
  const [user_type, setUsertype] = useState("CODER");
  const handleEmailChange = (event) => {
    setEmail(event.target.value.trim());
  };
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handlePasswordCheckChange = (event) => {
    setPasswordCheck(event.target.value);
  };
  const handleUserTypeChange = (event) => {
    setUsertype(event.target.value);
  };

  /*  const clickSignUpButtonHandler = () => {
    if (
      email === "" ||
      user_name === "" ||
      password === "" ||
      password_check === ""
    )
      alert("fill all!");
    else if (password !== password_check) alert("check password!");
    else {
      setSignedUp("true");
      const data = {
        email: this.state.email,
        user_name: this.state.user_name,
        password: this.state.password,
        user_type: this.state.user_type,
      };
      this.props.onStoreUser(
        data.email,
        data.user_name,
        data.password,
        data.user_type
      );
      alert("submitted!");
    }
  };*/

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
                  id="user_name"
                  label="UserName"
                  value={user_name}
                  onChange={handleUserNameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  value={email}
                  onChange={handleEmailChange}
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
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Password Check"
                  type="password"
                  id="password_check"
                  value={password_check}
                  onChange={handlePasswordCheckChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="user_type"
                  select
                  fullWidth
                  label="user type"
                  value={user_type}
                  onChange={handleUserTypeChange}
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
              className={classes.submit}
              //onClick={clickSignupButtonHandler}
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
