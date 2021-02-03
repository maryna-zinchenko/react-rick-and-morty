import React, { useState, useEffect } from "react";
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { request } from '..//..//api';
import './Episodes.scss';
import useStyles from './useStyles';

export default function Episodes() {
  const [page, setPage] = useState(1);
  const [allPages, setAllPages] = useState('');
  const [rows, setRows] = useState([]);
  const [name, setName] = useState('');
  const [error, setError] = useState('')
  const classes = useStyles();

  useEffect(() => {
    if (name ) {
      request(`/episode/?page=${page}&name=${name}`)
      .then((data) => {
        const { results } = data;
        setRows(results);
        setError(false);
      })
      .catch(e => setError(true))
    } else {
    request(`/episode?page=${page}`)
    .then((data) => {
      const {info, results } = data;
      setRows(results);
      setAllPages(info.pages);
    });
    }
  }, [name, page])

  const showNextPage = () => {
    if (page < allPages) {
      setPage(page + 1)
    }
  }

  const showPrevPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  return (
    <article className="episodes">
      <h2 className="episodes__header">Episodes</h2>
      {error && <p className="episodes__warning"> No matches!</p>}
      <div className="episodes__filters">
        <FormControl 
          className={classes.filters} 
          noValidate 
          autoComplete="off"
        >
          <TextField 
            id="filled-basic" 
            label="Name" 
            variant="filled" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
      </div>
      <TableContainer 
        className={classes.root}
        component={Paper}
        centered
      >
      <IconButton onClick={showPrevPage} disabled={page === 1} >
          <ArrowBackIosIcon color={page === 1 ? "disabled" : "secondary"}/>
        </IconButton>
        <IconButton onClick={showNextPage} disabled={page === allPages} >
          <ArrowForwardIosIcon color={page === allPages ? "disabled" : "secondary"}/>
        </IconButton>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Episode</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.air_date}</TableCell>
              <TableCell align="right">{row.episode}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
    </article>
  );
}