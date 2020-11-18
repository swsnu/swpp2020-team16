import React, { Fragment } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  box: {
    maring: theme.spacing(3),
    padding: theme.spacing(3),
  },
}));

export default function OtherSolutionsTable(props) {
  const classes = useStyles();
  const userList = props.userList;
  const solList = props.solList;
  const { pid } = props;

  console.log(solList);

  const handleClick = () => {};
  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>title</TableCell>
            <TableCell>user_id</TableCell>
            <TableCell>username</TableCell>
            <TableCell>style</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <Fragment>
            {userList.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{`${row.username}'s solution`}</TableCell>
                <TableCell>{row.user_id}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.style}</TableCell>
              </TableRow>
            ))}
          </Fragment>
          <Fragment>
            {solList.map((row) => (
              <TableRow key={row.id}>
                <TableCell
                  className={classes.box}
                  colSpan={4}
                  align="center"
                  onClick={handleClick}
                >
                  hidden
                </TableCell>
              </TableRow>
            ))}
          </Fragment>
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more
        </Link>
      </div>
    </React.Fragment>
  );
}
