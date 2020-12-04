import React from 'react';
import PropTypes from 'prop-types';

import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  box: {
    maring: theme.spacing(3),
    padding: theme.spacing(3),
  },
  row: {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, .05)',
    },
  },
  paper: {
    position: 'absolute',
    alignSelf: 'center',
    top: 0,
    bottom: 0,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
    width: '50vw',
    height: '50vw',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '1%',
    border: '2px solid black',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function createRows(a, b) {
  return a.map((k, i) => [k, b[i]]);
}

export default function OtherSolutionsTable(props) {
  const classes = useStyles();
  const { selectedUsers } = props;
  const { selectedSolutions } = props;
  const rows = createRows(selectedUsers, selectedSolutions);

  const [open, setOpen] = React.useState(false);
  const [code, setCode] = React.useState('');
  const [time, setTime] = React.useState('');
  const [erase, setErase] = React.useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ModalBody = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title">Source code</h2>
      <p id="simple-modal-description">{code}</p>
      <h3 id="simple-modal-title">Elapsed time</h3>
      <p>{time}</p>
      <h3 id="simple-modal-title">Erase count</h3>
      <p>{erase}</p>
    </div>
  );

  return (
    <>
      <Grid>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {ModalBody}
        </Modal>
      </Grid>
      <Table size="small" className="otherSolutionsTable">
        <TableHead>
          <TableRow>
            <TableCell>title</TableCell>
            <TableCell>user_id</TableCell>
            <TableCell>username</TableCell>
            <TableCell>style</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <>
              <TableRow
                key={row[0].id}
                className={classes.row}
                onClick={() => {
                  setCode(row[1].code);
                  setErase(row[1].erase_cnt);
                  setTime(row[1].elapsed_time);
                  handleOpen();
                }}
              >
                <TableCell className="titleRow">{`${row[0].username}'s solution`}</TableCell>
                <TableCell>{row[0].user_id}</TableCell>
                <TableCell>{row[0].username}</TableCell>
                <TableCell>{row[0].style.style}</TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="/" className="seeMore">
          See more
        </Link>
      </div>
    </>
  );
}

OtherSolutionsTable.propTypes = {
  selectedUsers: PropTypes.object.isRequired,
  selectedSolutions: PropTypes.object.isRequired,
};

OtherSolutionsTable.defaultProps = {};
