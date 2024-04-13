import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MovieList from './MovieList';

// Mock modules
jest.mock('./AuthContext', () => ({
  useAuth: jest.fn(() => ({ user: 'testUser' }))
}));
jest.mock('react-toast-notifications', () => ({
  useToasts: jest.fn(() => ({ addToast: jest.fn() }))
}));
jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(() => ({ push: jest.fn() }))
}));

describe('MovieList', () => {
  const api = {
    addFavorite: jest.fn(),
    getFavorites: jest.fn()
  };

  const movies = [
    { imdbId: '1', title: 'Movie 1' },
    { imdbId: '2', title: 'Movie 2' },
    { imdbId: '3', title: 'Movie 3' }
  ];

  it('renders movie list', () => {
    const { getByText } = render(<MovieList api={api} movies={movies} />);
    
    // Check if movie titles are rendered
    movies.forEach(movie => {
      expect(getByText(movie.title)).toBeInTheDocument();
    });
  });

  it('calls showDetails when Details button is clicked', () => {
    const { getByText } = render(<MovieList api={api} movies={movies} />);
    
    // Mock showDetails function
    const showDetails = jest.fn();
    MovieList.showDetails = showDetails;
    
    // Click Details button for first movie
    fireEvent.click(getByText('Details'));

    // Expect showDetails to be called with movie info
    expect(showDetails).toHaveBeenCalledWith(movies[0]);
  });

  // Add more tests as needed for other functionalities
});
