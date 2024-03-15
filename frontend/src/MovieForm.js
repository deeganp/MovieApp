import React, { useState } from 'react';
import Movie from './MovieClass';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications'; 
import './MovieForm.css';

const SearchMovie = ({ SetMovies }) => {
  const history = useHistory();
  const { addToast } = useToasts(); 
  const [movieName, setMovieName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!movieName.trim()) {
      addToast('Please enter a movie name', { appearance: 'warning' }); 
      return; 
    }

    try {
      const movieData = await Movie.getMovieByTitle(movieName);
      SetMovies(movieData);
      history.push('/results');
    } catch (error) {
      console.error('Error fetching movie data:', error);
      addToast('Error fetching movie data', { appearance: 'error' }); 
    }
  };

  return (
    <div className='movie-form-container'>
      <form onSubmit={handleSubmit} className="movie-form">
        <input
          type='text'
          placeholder='Search for a movie...'
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          className="form-group"
        />
        <button type='submit' className='btn btn-primary rounded-pill px-3 mb-2 mb-lg-0'>Search!</button> 
      </form>
    </div>
  );
};

export default SearchMovie;
