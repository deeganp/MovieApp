import React, { useEffect, useState } from 'react';
import MovieAppApi from './api'; // Import your MovieAppApi class
import { useAuth } from './AuthContext';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import NoFavorites from './NoFavorites'
import './favorites.css';
import Movie from './MovieClass';

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

  const handleDeleteFavorite = async (movieName, movieImdbId) => {
    try {
      const api = new MovieAppApi();
    
      await api.deleteFavorite(user, movieName, movieImdbId); // Use user.username
      // Refresh the favorites list after deletion
      const updatedFavorites = favorites.filter((fav) => fav.imdbId !== movieImdbId);
      setFavorites(updatedFavorites);
      addToast(`Deleted ${movieName} from favorites!`, { appearance: 'success', autoDismiss: true });
    } catch (err) {
      console.error('Failed to delete favorite', error);
      addToast(`Failed to delete ${movieName} from favorites, please try again.`, { appearance: 'error', autoDismiss: true })
    }
  };

  const getMovieDetailsByID = async (movieID) => {

    try {
      
      const movie = await Movie.getMovieDetailsByID(movieID);
      const movieInfo = movie[0];
      
      history.push({
        pathname: '/MovieDetails',
        state: { movieInfo },
      });
    } catch (error) {
      console.error(error);
    }
  }



return (
  <div>
    {/* Favorites Section */}
    <section id="favorites" className="bg-light">
      <div className="container px-5">
        <div className="row">
          <div className="col">
            <h2 className="display-4">My Favorites</h2>
            {favorites.length > 0 ? (
              <ul className='fav-list'>
                {favorites.map((favorite) => (
                  <li key={favorite.imdbId} className='fav-item'>
                    <span className="movie-name">{favorite.title}</span>
                    <div className="button-container">
                      <button className='button-29' onClick={() => getMovieDetailsByID(favorite.imdbId)}>Details</button>
                      <button className='button-28' onClick={() => handleDeleteFavorite(favorite.title, favorite.imdbId)}>Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <NoFavorites />
            )}
          </div>
        </div>
      </div>
    </section>
  </div>
);
};


export default Favorites;
