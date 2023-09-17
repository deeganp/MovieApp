import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieList from './MovieList';
import * as AuthApi from './AuthApi'; // Import your authentication API functions

// Mock the AuthApi functions and the useAuth hook
jest.mock('./AuthApi');
jest.mock('./AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('MovieList component', () => {
  it('renders a list of movies and allows adding favorites', async () => {
    // Mock the useAuth hook to provide a user
    const userMock = { username: 'testuser' };
    require('./AuthContext').useAuth.mockReturnValue({ user: userMock });

    // Mock the addFavorite and getFavorites functions
    AuthApi.addFavorite.mockResolvedValue();
    AuthApi.getFavorites.mockResolvedValue([]);

    const movies = ['Movie 1', 'Movie 2'];

    render(<MovieList api={AuthApi} movies={movies} />);

    // Verify that the movies are displayed
    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();

    // Find the "Favorite" buttons and click one of them
    const favoriteButton = screen.getByText('Favorite');
    fireEvent.click(favoriteButton);

    // Verify that addFavorite was called with the correct arguments
    expect(AuthApi.addFavorite).toHaveBeenCalledWith('testuser', 'Movie 1');

    // Wait for getFavorites to be called and update the state
    await screen.findByText('Movie 1'); // Wait for the movie to appear again

    // Verify that the "Favorite" button now says "Favorited"
    expect(screen.getByText('Favorited')).toBeInTheDocument();
  });

  it('handles errors when adding favorites', async () => {
    // Mock the useAuth hook to provide a user
    const userMock = { username: 'testuser' };
    require('./AuthContext').useAuth.mockReturnValue({ user: userMock });

    // Mock the addFavorite function to throw an error
    AuthApi.addFavorite.mockRejectedValue(new Error('Error adding favorite'));

    const movies = ['Movie 1', 'Movie 2'];

    render(<MovieList api={AuthApi} movies={movies} />);

    // Find the "Favorite" buttons and click one of them
    const favoriteButton = screen.getByText('Favorite');
    fireEvent.click(favoriteButton);

    // Verify that addFavorite was called with the correct arguments
    expect(AuthApi.addFavorite).toHaveBeenCalledWith('testuser', 'Movie 1');

    // Verify that the error message is displayed
    expect(await screen.findByText('Error adding favorite')).toBeInTheDocument();
  });
});
