import React, { Fragment } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

/* MUIs */
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleIcon from '@material-ui/icons/People';
import AssessmentIcon from '@material-ui/icons/Assessment';

/* REDUXs */
import { connect } from 'react-redux';
import { signOut } from '../feature/user/userSignSlice';
import configureStore from '../configureStore';

const { persistor } = configureStore();

const useStyles = makeStyles(() => ({
  list: {
    width: 300,
  },
  title: {
    flexGrow: 1,
  },
}));

function NavbarOMG(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => () => {
    setState({ ...state, [anchor]: open });
  };

  const listLeft = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          'URTJ',
          'UTRC',
          'UTTJ',
          'UTTC',
          'UIRJ',
          'UIRC',
          'UITJ',
          'UITC',
          'MTRJ',
          'MTRC',
          'MTTJ',
          'MTTC',
          'MIRJ',
          'MTRC',
          'MITJ',
          'MITC',
        ].map((text) => (
          <Fragment>
            <ListItem button key={text} href="/group">
              <ListItemText
                align="center"
                primary={text}
                onClick={() => {
                  window.location.href = `../../../../types/${text}`;
                }}
              />
            </ListItem>
            <Divider />
          </Fragment>
        ))}
      </List>
    </div>
  );

  const listRightContent = [
    {
      text: 'My Group',
      href: '/group',
      icon: <PeopleIcon />,
    },
    {
      text: 'My Invitations',
      href: '/invitation',
      icon: <MailIcon />,
    },
    {
      text: 'My Test Results',
      href: '/my/tests/results',
      icon: <AssessmentIcon />,
    },
  ];

  const listRight = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {listRightContent.map((content) => (
          <Fragment>
            <ListItem
              button
              key={content.text}
              component="a"
              style={{ height: '10vh', fontSize: '5vw' }}
              href={content.href}
            >
              <ListItemIcon>{content.icon}</ListItemIcon>
              <ListItemText color="inherit" primary={content.text} />
            </ListItem>
            <Divider />
          </Fragment>
        ))}
      </List>
    </div>
  );
  return (
    <>
      <CssBaseline />

      <SwipeableDrawer
        anchor="left"
        open={state.left}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
      >
        {listLeft('left')}
      </SwipeableDrawer>

      <SwipeableDrawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer('right', false)}
        onOpen={toggleDrawer('right', true)}
      >
        {listRight('right')}
      </SwipeableDrawer>
      <AppBar position="relative" className="navbar">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            id="drawerButton"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer('left', true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title} />
          <Button color="inherit" href="/">
            Home
          </Button>
          {props.user.username !== null ? (
            <Button
              color="inherit"
              onClick={() => {
                props.signOut();
                persistor.purge();
                window.location.replace('/');
              }}
            >
              Logout
            </Button>
          ) : (
            <Button color="inherit" href="/signin/">
              Login
            </Button>
          )}
          {props.user.username !== null ? (
            <IconButton
              edge="end"
              color="inherit"
              onClick={toggleDrawer('right', true)}
            >
              <AccountCircle />
            </IconButton>
          ) : null}
        </Toolbar>
      </AppBar>
    </>
  );
}
NavbarOMG.propTypes = {
  signOut: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapDispatchToProps = (state) => ({
  user: state.user.userSignReducer,
});

export default connect(mapDispatchToProps, {
  signOut,
})(NavbarOMG);
