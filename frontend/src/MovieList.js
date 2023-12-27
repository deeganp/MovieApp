import React, { useState } from 'react'; 
import { useAuth } from './AuthContext';
import "./MovieList.css"

const MovieList = ({api, movies }) => {
  const [favorites, setFavorites] = useState([]);
  const {user} = useAuth();
 

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
      alert(`Added ${movieName} to favorites!`);
    } catch (error) {
      // Handle errors, such as when the user is not logged in
      console.error(error);
    }
  };

  return (
    <div className='movie-list-container'>
    <ul className='movie-list'>
      {movies.map((movie) => (
        <li key={movie} className='movie-item'>
          <span className='movie-name'>{movie} </span>
          <button className='button-29' onClick={() => handleAddFavorite(movie)}>Favorite</button>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default MovieList;

  