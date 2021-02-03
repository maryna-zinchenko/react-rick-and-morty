import React, { useState, useEffect } from "react";
import CharacterCard from './CharacterCard/CharacterCard'
import { request } from '..//..//api'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './Characters.scss';
import useStyles from './useStyles'

 export default function Characters() {
  const [characters, setCharacters] = useState();
  const [page, setPage] = useState(1);
  const [info, setInfo] = useState();
  const classes = useStyles();
  const [species, setSpecies] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (species || gender || status) {
      request(`/character/?page=${page}&species=${species}&gender=${gender}&status=${status}`)
      .then((data) => {
        const { info, results } = data;
        setCharacters(results);
        setInfo(info.pages);
        setError(false)
      })
      .catch(e => setError(true))
    } else {
      request(`/character/?page=${page}`)
      .then((data) => {
        const { info, results } = data;
        setCharacters(results);
        setInfo(info.pages);
        setError(false)
      })
      .catch(e => setError(true))
    }
  }, [page, gender, species, status])

  const showNextPage = () => {
    if (page < info) {
      setPage(prev => prev + 1)
    }
  }

  const showPrevPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1)
    }
  }

  const pages = Array.from(Array(info).keys());

  return (
  <article className="characters">
    <h2 className="characters__header">Characters</h2>
    {error && <p>No matches!</p>}
    <FormControl variant="filled" className={classes.formControl}>
      <InputLabel id="demo-simple-select-filled-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <MenuItem value={``}>All</MenuItem>
          <MenuItem value="male" >Male</MenuItem>
          <MenuItem value="female" >Female</MenuItem>
          <MenuItem value="genderless" >Genderless</MenuItem>
          <MenuItem value="unknown" >Unknown</MenuItem>

        </Select>
      </FormControl>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">Species</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
        >
          <MenuItem value={``}>All</MenuItem>
          <MenuItem value="human">Human</MenuItem>
          <MenuItem value="animal">Animal</MenuItem>
          <MenuItem value="alien">Alien</MenuItem>
          <MenuItem value="disease">Disease</MenuItem>
          <MenuItem value="cronenberg">Cronenberg</MenuItem>
          <MenuItem value="robot">Robot</MenuItem>
          <MenuItem value="humanoid" >Humanoid</MenuItem>
          <MenuItem value="poopybutthole">Poopybutthole</MenuItem>
          <MenuItem value={`mythological&creature`}>Mythological Creature</MenuItem>
          <MenuItem value="unknown">unknown</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value={``}>All</MenuItem>
          <MenuItem value="alive">Alive</MenuItem>
          <MenuItem value="dead">Dead</MenuItem>
          <MenuItem value="unknown">Unknown</MenuItem>
        </Select>
      </FormControl>
      <div className="characters__buttons">
        <button
          className="characters__control"
          disabled={page === 1}
          type="button"
          onClick={showPrevPage}
        >
          Prev page
        </button>
        {pages.map(page => 
          <button
            className="characters__btn"
            type="button"
            onClick={() => setPage(page+1)}
          >
            {page + 1}
          </button>
        )}
        <button
          className="characters__control"
          type="button"
          onClick={showNextPage}
          disabled={page === info}
        >
          Next page
        </button>
      </div>
      <section className="characters__list">
        {characters && characters.map(character => <CharacterCard character={character} />)}
      </section>
    </article>
  );
}

