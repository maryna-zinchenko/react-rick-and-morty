import React, { useState, useEffect } from "react";
import CharacterCard from './CharacterCard/CharacterCard'
import { request } from '..//..//api'
import Button from '@material-ui/core/Button';
import './Characters.scss';
import useStyles from './useStyles'
import CharactersFilter from './CharactersFilter/CharactersFilter';

const gendersArray = ['all', 'male', 'female', 'genderless', 'unknown'];
const speciesArray = ['all', 'human', 'animal', 'alien', 'disease', 'cronenberg', 'robot', 'humanoid', 'poopybutthole', 'unknown' ];
const statusArray = ['all', 'alive', 'dead', 'unknown'];

 export default function Characters() {
  const [characters, setCharacters] = useState();
  const [page, setPage] = useState(1);
  const [info, setInfo] = useState();
  const classes = useStyles();
  const [species, setSpecies] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState(false);
  const pages = Array.from(Array(info).keys());

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

  const clearFilters = () => {
    setSpecies('');
    setGender('');
    setStatus('');
  }

  return (
  <article className="characters">
    <h2 className="characters__header">Characters</h2>
    {error && <p>No matches!</p>}
    <CharactersFilter 
      name="Gender" 
      filters={gendersArray} 
      filterFunction={(item) => setGender(item)}
    />
    <CharactersFilter 
      name="Species" 
      filters={speciesArray} 
      filterFunction={(item) => setSpecies(item)}
    />
    <CharactersFilter 
      name="Status" 
      filters={statusArray} 
      filterFunction={(item) => setStatus(item)}
    />
      <Button 
        className={classes.formButton}
        onClick={clearFilters}
        variant="contained" 
        color="primary"
      >
        Reset filter
      </Button>
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

