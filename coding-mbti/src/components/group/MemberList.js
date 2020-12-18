/* eslint-disable react/jsx-indent */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  paperBackground: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  table: {
    minWidth: 650,
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
    username: '-',
    style: '-',
    detail: '-',
    delete: '-',
  },
  {
    avatar: '-',
    username: '-',
    style: '-',
    detail: '-',
    delete: '-',
  },
  {
    avatar: '-',
    username: '-',
    style: '-',
    detail: '-',
    delete: '-',
  },
];

const stylesDict = {
  1: 'UTRJ',
  2: 'UTRC',
  3: 'UTTJ',
  4: 'UTTC',
  5: 'UIRJ',
  6: 'UIRC',
  7: 'UITJ',
  8: 'UITC',
  9: 'MTRJ',
  10: 'MTRC',
  11: 'MTTJ',
  12: 'MTTC',
  13: 'MIRJ',
  14: 'MTRC',
  15: 'MITJ',
  16: 'MITC'
};

export default function MemberList(props) {
  const {
    groupId, members, deleteMember, detailMember
  } = props;
  const classes = useStyles();
  return (
    <div>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        textAlign="center"
      >
        <Grid item>
          <Typography variant="h5" component="h5">
            Group coders
          </Typography>
        </Grid>
      </Grid>
      <div style={{ height: '25px' }} />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Avatar</StyledTableCell>
              <StyledTableCell align="center">name</StyledTableCell>
              <StyledTableCell align="center">role</StyledTableCell>
              <StyledTableCell align="center">style</StyledTableCell>
              <StyledTableCell align="center">detail</StyledTableCell>
              <StyledTableCell align="center">delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              <StyledTableRow key="me">
                <StyledTableCell component="th" scope="row">
                  <ListItemAvatar>
                    <Avatar alt="me" src="../nosrc" />
                  </ListItemAvatar>
                </StyledTableCell>
                <StyledTableCell align="center">me</StyledTableCell>
                <StyledTableCell align="center">manager</StyledTableCell>
                <StyledTableCell align="center">-</StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton
                    edge="end"
                    aria-label="detail"
                    onClick={() => detailMember('myself')}
                  >
                    <InfoIcon />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell align="center">-</StyledTableCell>
              </StyledTableRow>
            }
            {Object.keys(members).map((member) => (
              <StyledTableRow key={member.username}>
                <StyledTableCell component="th" scope="row">
                  <ListItemAvatar>
                    <Avatar alt={members[member].username.toUpperCase()} src="../nosrc" />
                  </ListItemAvatar>
                </StyledTableCell>
                <StyledTableCell align="center">{members[member].username}</StyledTableCell>
                <StyledTableCell align="center">coder</StyledTableCell>
                <StyledTableCell align="center">{stylesDict[members[member].style.style] ? stylesDict[members[member].style.style] : '-'}</StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton
                    edge="end"
                    aria-label="detail"
                    onClick={() => detailMember(members[member].user_id)}
                  >
                    <InfoIcon />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton edge="end" aria-label="delete" onClick={() => deleteMember(groupId, members[member].user_id)}>
                    <DeleteForeverIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
            {
              emptyRowContent.map((coder) => (
                <StyledTableRow align="center" key={coder.name}>
                  <StyledTableCell>
                    {coder.avatar}
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {coder.username}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    -
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {coder.style}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {coder.detail}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {coder.delete}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

MemberList.propTypes = {
  groupId: PropTypes.string.isRequired,
  members: PropTypes.object.isRequired,
  deleteMember: PropTypes.func.isRequired,
  detailMember: PropTypes.func.isRequired,
};
