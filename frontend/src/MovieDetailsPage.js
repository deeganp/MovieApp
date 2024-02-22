import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import Movie from './MovieClass';
import './MovieDetailsPage.css';

const MovieDetailsPage = () => {
  const { state } = useLocation();
  const movieInfo = state?.movieInfo;
  console.log(movieInfo);
  const [movieDetails, setMovieDetails] = useState(movieInfo);

  useEffect(() => {
    const fetchMoviePoster = async () => {
      try {
        if (movieInfo) {
          console.log(movieInfo);
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
        </Col>
        <Col md={8}>
          <h2>{title || 'No Title'}</h2>
          <p><strong>Overview:</strong> {overview || 'No overview'}</p>
          <p><strong>Release Year:</strong> {year || 'No Year'}</p>
          <p><strong>Genres:</strong> {genres?.join(', ') || 'No genres'}</p>
          <p><strong>Directors:</strong> {directors?.join(', ') || 'No directors'}</p>
          <p><strong>Cast:</strong> {cast?.join(', ') || 'No cast'}</p>
          <p><strong>IMDb ID:</strong> {imdbId || 'No IMDb ID'}</p>
          <p className="streaming-info">
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
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetailsPage;
