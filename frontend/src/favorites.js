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
          const userFavorites = await api.getFavorites(user); // Use user.username
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
      history.push("/");
      setLoading(false);
    }
  }, [user]);

  return (
    <div>
      <h2>My Favorites</h2>
      <ul className='fav-list'>
        {favorites.map((movieName) => (
          <li key={movieName} className='fav-item'>{movieName}</li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
