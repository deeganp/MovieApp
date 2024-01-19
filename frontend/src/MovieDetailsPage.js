import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import Movie from './MovieClass';
import './MovieDetailsPage.css';

const MovieDetailsPage = () => {
    const { state } = useLocation();
    const movieID = state?.movieID;
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                if (movieID) {
                    const details = await Movie.getMovieById(movieID);
                    console.log('Movie Details:', details);
                    setMovieDetails(details);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovieDetails();
    }, [movieID]);

    if (!movieID || !movieDetails) {

        return null;
    }

    const {
        primaryImage,
        titleText,
        releaseYear,
        caption,
    } = movieDetails;

    return (
        <Container id = 'MovieDetailsContainer'>
            <Row>
                <Col md={4}>
                    <img
                        src={primaryImage?.url || 'https://via.placeholder.com/276x409'}
                        alt={titleText?.text || 'No Title'}
                        className="img-fluid custom-image"
                    />
                    {/* //<p className="mt-3">{primaryImage ? caption?.plainText || 'No caption' : 'No poster found'}</p> */}
                </Col>
                <Col md={8}>
                    <h2>{titleText?.text || 'No Title'}</h2>
                    <p>
                        <strong>Caption:</strong> {primaryImage?.caption?.plainText || 'No caption'}
                    </p>
                    <p>
                        <strong>Release Year:</strong> {releaseYear?.year || 'No Year'}
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default MovieDetailsPage;
