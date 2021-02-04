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
import { request } from '..//..//api';
import './Locations.scss';
import useStyles from './useStyles';
import LocationFilter from "./LocationFilter/LocationFilter";

export default function Locations() {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [dimension, setDimension] =useState('');
  const [error, setError] = useState('')

  useEffect(() => {
    if (name || type || dimension) {
      request(`/location/?page=${page}&name=${name}&type=${type}&dimension=${dimension}`)
      .then((data) => {
        const { results } = data;
        setRows(results);
        setError(false);
      })
      .catch(e => setError(true))
    } else {
      request(`/location/?page=${page}`)
      .then((data) => {
        const { results } = data;
        setRows(results);
        setError(false);
      });
    }
  }, [page, name, type, dimension])

  const showNextPage = () => {
    if (page < 6) {
      setPage(page + 1)
    }
  }

  const showPrevPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  return (
    <aricle className="location">
      <h2 className="location__header">Locations</h2>
      {error && <p className="location__warning"> No matches!</p>}
      <div className="location__filters">
        <LocationFilter name="Name" filterFunction={(item) => setName(item)}/>
        <LocationFilter name="Dimension" filterFunction={(item) => setDimension(item)}/>
        <LocationFilter name="Type" filterFunction={(item) => setType(item)}/>
      </div>
        
      <TableContainer className={classes.root} component={Paper} centered>
      <IconButton onClick={showPrevPage} disabled={page === 1} >
          <ArrowBackIosIcon color={page === 1 ? "disabled" : "secondary"} />
        </IconButton>
        <IconButton onClick={showNextPage} disabled={page === 6} >
          <ArrowForwardIosIcon color={page === 6 ? "disabled" : "secondary"} />
        </IconButton>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Dimendions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.type}</TableCell>
                <TableCell align="right">{row.dimension}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </aricle>
  );
}
