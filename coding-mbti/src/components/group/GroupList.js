import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

/* M-UIs */
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';

/* Components */
import GroupCreate from './GroupCreate';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const emptyRowContent = [
  {
    avatar: '-',
    groupname: '-',
    manager: '-',
    detail: '-',
    delete: '-',
  },
  {
    avatar: '-',
    groupname: '-',
    manager: '-',
    detail: '-',
    delete: '-',
  },
  {
    avatar: '-',
    groupname: '-',
    manager: '-',
    detail: '-',
    delete: '-',
  },
];

export default function GroupList(props) {
  const classes = useStyles();
  const history = useHistory();

  const {
    groups, createGroup, deleteGroup, error, isManager
  } = props;

  return (
    <>
      <div style={{ height: '25px' }} />
      <Container>
        <Grid container direction="row" justify="center" alignItems="center" textAlign="center">
          <Grid item>
            <Typography variant="h3" component="h3">
              My Groups
            </Typography>
          </Grid>
        </Grid>
        <div style={{ height: '25px' }} />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Avatar</StyledTableCell>
                <StyledTableCell align="center">Group Name</StyledTableCell>
                <StyledTableCell align="center">Manager</StyledTableCell>
                <StyledTableCell align="center">Details</StyledTableCell>
                <StyledTableCell align="center">Delete This Group</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(groups).map((group) => (
                <StyledTableRow key={groups[group].name}>
                  <StyledTableCell>
                    <ListItemAvatar>
                      <Avatar alt={groups[group].name.toUpperCase()} src="../nosrc" />
                    </ListItemAvatar>
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {groups[group].name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    me
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton
                      edge="end"
                      aria-label="comments"
                      color="primary"
                      iconStyle={{
                        width: 60,
                        height: 60,
                      }}
                      onClick={() => history.push(`/group/detail/${group}`)}
                    >
                      <SupervisedUserCircleIcon />
                    </IconButton>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton
                      edge="end"
                      aria-label="comments"
                      color="secondary"
                      iconStyle={{
                        width: 80,
                        height: 80,
                      }}
                      onClick={() => { deleteGroup(groups[group].id); }}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              {
                emptyRowContent.map((group) => (
                  <StyledTableRow align="center" key={group.name}>
                    <StyledTableCell>
                      {group.avatar}
                    </StyledTableCell>
                    <StyledTableCell align="center" component="th" scope="row">
                      {group.groupname}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {group.manager}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {group.detail}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {group.delete}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ height: '25px' }} />
        <Grid container spacing={2} direction="row" justify="center" alignItems="center" textAlign="center">
          <Grid item>
            <GroupCreate createGroup={createGroup} error={error} isManager={isManager} />
          </Grid>
        </Grid>
        <div style={{ height: '25px' }} />
      </Container>
    </>
  );
}

GroupList.propTypes = {
  groupId: PropTypes.number.isRequired,
  deleteGroup: PropTypes.func.isRequired,
  groups: PropTypes.object.isRequired,
  createGroup: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  isManager: PropTypes.bool.isRequired,
};
