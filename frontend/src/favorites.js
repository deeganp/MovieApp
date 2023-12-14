import React, { useEffect, useState } from 'react';
import MovieAppApi from './api'; // Import your MovieAppApi class
import { useAuth } from './AuthContext';
import { useHistory } from 'react-router-dom';
import './favorites.css';

const Favorites = () => {
  const { user } = useAuth(); // Access the current user from your AuthContext
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      // Fetch user's favorite movies only if a user is logged in
      const fetchFavorites = async () => {
        try {
          const api = new MovieAppApi();
          const token = localStorage.getItem('token');
          const userFavorites = await api.getFavorites(user, token); // Use user.username
          setFavorites(userFavorites);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch favorites');
          setLoading(false);
        }
      };

      fetchFavorites();
    } else {
      // Handle the case when no user is logged in (e.g., redirect to login)
      history.push('/');
      setLoading(false);
    }
  }, [user]);

  const handleDeleteFavorite = async (movieName) => {
    try {
      const api = new MovieAppApi();
      await api.deleteFavorite(user, movieName); // Use user.username
      // Refresh the favorites list after deletion
      const updatedFavorites = favorites.filter((fav) => fav !== movieName);
      setFavorites(updatedFavorites);
    } catch (err) {
      setError('Failed to delete favorite');
    }
  };

  return (
    <div>
      <h2>My Favorites</h2>
      <ul className='fav-list'>
        {favorites.map((movieName) => (
          <li key={movieName} className='fav-item'>
            {movieName}
            <button className='delete' onClick={() => handleDeleteFavorite(movieName)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
