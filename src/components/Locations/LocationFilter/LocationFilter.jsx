import React from "react";
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import useStyles from './styles';

export default function LocationFilter({ filterFunction, name}) {
  const classes = useStyles();

  return (
    <FormControl className={classes.filters} noValidate autoComplete="off">
      <TextField 
        id="filled-basic" 
        label={name} 
        variant="filled" 
        onChange={(e) => filterFunction(e.target.value)}
      />
    </FormControl>
  )
};