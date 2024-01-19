import React, { useEffect, useState } from 'react';
import MovieAppApi from './api'; // Import your MovieAppApi class
import { useAuth } from './AuthContext';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import NoFavorites from './NoFavorites'
import './favorites.css';

const Favorites = () => {
  const { user } = useAuth(); // Access the current user from your AuthContext
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();
  const { addToast } = useToasts();

  useEffect(() => {
    if (user) {
      // Fetch user's favorite movies only if a user is logged in
      const fetchFavorites = async () => {
        try {
          const api = new MovieAppApi();
          // const token = localStorage.getItem('token');
          // const userFavorites = await api.getFavorites(user, token); 
          const userFavorites = await api.getFavorites(user); 
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
      history.push('/signin');
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
      addToast(`Deleted ${movieName} from favorites!`,{ appearance: 'success', autoDismiss: true });
    } catch (err) {
      console.error('Failed to delete favorite', error);
      addToast(`Failed to delete ${movieName} from favorites, please try again.`, { appearance: 'error', autoDismiss: true })
    }
  };

  return (
    <div>
      <p id='fav-page-title'>My Favorites</p>
      {favorites.length > 0 ? (
        <ul className='fav-list'>
          {favorites.map((movieName) => (
            <li key={movieName} className='fav-item'>
              {movieName}
              <button className='delete' onClick={() => handleDeleteFavorite(movieName)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <NoFavorites />
      )}
    </div>
  );
};

export default Favorites;
