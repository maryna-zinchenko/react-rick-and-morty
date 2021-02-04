import React from "react";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import useStyles from './styles'

export default function CharactersFilter({ name, filters, filterFunction }) {
  const classes = useStyles();

  return (
    <FormControl variant="filled" className={classes.formControl}>
      <InputLabel id="demo-simple-select-filled-label">{name}</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          onChange={(e) => filterFunction(e.target.value)}
        >
          {filters.map(filter => filter==='all'
            ? <MenuItem value={''}>{filter.charAt(0).toUpperCase() + filter.slice(1)}</MenuItem> 
            : <MenuItem value={filter}>{filter.charAt(0).toUpperCase() + filter.slice(1)}</MenuItem>)}

        </Select>
      </FormControl>
  )
}