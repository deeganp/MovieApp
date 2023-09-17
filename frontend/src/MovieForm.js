import React, { useState } from 'react';
import Movie from './MovieClass';
import { useHistory} from 'react-router-dom';
import './MovieForm.css'

const SearchMovie = ({ SetMovies }) => {
  const history = useHistory();
  const [movieName, setMovieName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    const movieData = await Movie.getMovieByTitle(movieName);
    SetMovies(movieData);
    
    history.push('/results');
    } catch(error) {
        console.error('Error fetching movie data;', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}  className="form-container">
      <input
        type='text'
        placeholder= 'Search for a movie...'
        value={movieName}
        onChange={(e) => setMovieName(e.target.value)}
        className="form-group"
      />
      <button type='submit' className='btn'>Search!</button>
    </form>
  );
};

export default SearchMovie;
