import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { useAuth } from './AuthContext';
import { useToasts } from 'react-toast-notifications';
import Movie from './MovieClass';
import MovieAppApi from './api';
import './MovieDetailsPage.css';

const MovieDetailsPage = () => {
  const { user } = useAuth();
  const { state } = useLocation();
  const { addToast } = useToasts();
  const movieInfo = state?.movieInfo;
  const [movieDetails, setMovieDetails] = useState(movieInfo);
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMoviePoster = async () => {
      try {
        if (movieInfo) {
          const poster = await Movie.getMoviePosterById(movieInfo.imdbId);
          setMovieDetails(prevMovieInfo => ({
            ...prevMovieInfo,
            posterURL: poster
          }));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMoviePoster();
  }, [movieInfo]);

  useEffect(() => {
    if (user) {
      // Fetch user's favorite movies only if a user is logged in
      const fetchFavorites = async () => {
        try {
          const api = new MovieAppApi();
          const userFavorites = await api.getFavorites(user);
          setFavorites(userFavorites);
          // Check if the movie is already in the favorites
          const isAlreadyFavorite = userFavorites.some(favorite =>
            favorite.title === movieInfo.title && favorite.imdbId === movieInfo.imdbId
          );
          setIsFavorite(isAlreadyFavorite);
        } catch (error) {
          console.error(error)
          setError('Failed to fetch favorites');
        }
      };

      fetchFavorites();
    }
  }, [user, movieInfo]);

  const handleAddFavorite = async () => {
    try {
      if (!isFavorite){
      const api = new MovieAppApi();
      await api.addFavorite(user, movieInfo.title, movieInfo.imdbId);
      setIsFavorite(true);
      addToast(`Added ${movieInfo.title} to favorites!`, { appearance: 'success', autoDismiss: true })
    } else { 
      addToast(`${movieInfo.title} is already a favorite`, { appearance: 'info', autoDismiss: true })
   }
  } catch (err) {
      addToast(`Failed to add movie to favorites, please try again. `, { appearance: 'error', autoDismiss: true })
      console.error('Failed to add favorite', err);
    }
  };

  const {
    title,
    overview,
    streamingInfo,
    cast,
    year,
    imdbId,
    genres,
    directors,
    posterURL
  } = movieDetails;

  return (
    <Container id='MovieDetailsContainer'>
      <Row>
        <Col md={4}>
          {posterURL ? (
            <img
              src={posterURL}
              alt={title || 'No Title'}
              className="img-fluid custom-image"
            />
          ) : (
            <h2>No poster found</h2>
          )}
           {user && (
            <button className = 'button-29'onClick={handleAddFavorite}>Add to Favorites</button>
          )}
        </Col>
        <Col md={8}>
          <h2>{title || 'No Title'}</h2>
          <p><strong>Overview:</strong> {overview || 'No overview'}</p>
          <p><strong>Release Year:</strong> {year || 'No Year'}</p>
          <p><strong>Genres:</strong> {genres?.join(', ') || 'No genres'}</p>
          <p><strong>Directors:</strong> {directors?.join(', ') || 'No directors'}</p>
          <p><strong>Cast:</strong> {cast?.join(', ') || 'No cast'}</p>
          <p><strong>IMDb ID:</strong> {imdbId || 'No IMDb ID'}</p>
          <div className="streaming-info">
            <strong>Streaming Info:</strong>
            {streamingInfo?.length > 0 ? (
              streamingInfo.map(info => (
                <div key={`${info.service}-${info.link}`}>
                  <strong style={{ textTransform: 'capitalize' }}>{info.service}:</strong> {info.link}
                </div>
              ))
            ) : (
              <span>No streaming info available</span>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetailsPage;
