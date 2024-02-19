import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import "./MovieList.css"


const MovieList = ({ api, movies }) => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();
  const { addToast } = useToasts();
  const history = useHistory();


  const handleAddFavorite = async (movieName) => {
    try {
      if(user){
      // Get the username of the currently logged-in user from your authentication context 
      const username = user;
      // Call the addFavorite method to add the movie to the user's favorites
      await api.addFavorite(username, movieName);

      // fetch the updated favorites here and set them in state
      const updatedFavorites = await api.getFavorites(username);
      setFavorites(updatedFavorites);
      addToast(`Added ${movieName} to favorites!`, { appearance: 'success', autoDismiss: true });
     }
     else {
      addToast(`Please Sign In Before Adding Movies To Favorites`, { appearance: 'error', autoDismiss: true })
    }
    } catch (error) {
      // Handle errors, such as when the user is not logged in
      console.error('Failed to add favorite', error);
      addToast(`Failed to add ${movieName} to favorites, please try again.`, { appearance: 'error', autoDismiss: true })

    }
  };


  const showDetails = async (movie) => {
    try {
      history.push({
        pathname: '/MovieDetails',
        state: {movie} ,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = async (movie) => {
    await showDetails(movie);
  };

  return (
    <div className='movie-list-container'>
      <ul className='movie-list'>
        {movies.map((movie) => (
          <li key={movie.imdbID} className='movie-item'>
            <div className='movie-details'>
              <span className='movie-name'>{movie.title} </span>
              <button className='button-29' onClick={() => handleClick(movie)}>Details</button>
              <button className='button-29' onClick={() => handleAddFavorite(movie.title)}>Favorite</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;

