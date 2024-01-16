import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useToasts } from 'react-toast-notifications';
import "./MovieList.css"


const MovieList = ({ api, movies }) => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();
  const { addToast } = useToasts();


  const handleAddFavorite = async (movieName) => {
    try {
      // Get the username of the currently logged-in user from your authentication context or state
      const username = user; // Replace with your actual logic to get the username

      // Call the addFavorite method to add the movie to the user's favorites
      await api.addFavorite(username, movieName);

      // Update the favorites state (if needed) to reflect the changes immediately
      // You can fetch the updated favorites here and set them in your state
      const updatedFavorites = await api.getFavorites(username);
      setFavorites(updatedFavorites);
      addToast(`Added ${movieName} to favorites!`, { appearance: 'success', autoDismiss: true });
    } catch (error) {
      // Handle errors, such as when the user is not logged in
      console.error('Failed to add favorite', error);
      addToast(`Failed to add ${movieName} to favorites, please try again.`, { appearance: 'error', autoDismiss: true })
    }
  };

  return (
    <div className='movie-list-container'>
      <ul className='movie-list'>
        {movies.map((movie) => (
          <li key={movie} className='movie-item'>
            <div className='movie-details'>
              <span className='movie-name'>{movie} </span>
              <button className='button-29' onClick={() => handleAddFavorite(movie)}>Favorite</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;

