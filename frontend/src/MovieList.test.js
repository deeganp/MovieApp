import React from 'react';
import { render } from '@testing-library/react';
import MovieList from './MovieList';

// Mock the AuthContext module
jest.mock('./AuthContext', () => ({
  useAuth: jest.fn(() => ({ user: 'testuser' })),
}));

// Mock the useHistory module
jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(() => ({ push: jest.fn() })),
}));

// Mock the useToasts module
jest.mock('react-toast-notifications', () => ({
  useToasts: jest.fn(() => ({ addToast: jest.fn() })),
}));

// Mock the api object
const mockApi = {
  addFavorite: jest.fn(),
  getFavorites: jest.fn(),
};

describe('MovieList component', () => {
  it('renders a list of movies', () => {
    const movies = [
      { imdbId: '1', title: 'Movie 1' },
      { imdbId: '2', title: 'Movie 2' },
    ];

    const { getByText } = render(<MovieList api={mockApi} movies={movies} />);

    expect(getByText('Movie 1')).toBeInTheDocument();
    expect(getByText('Movie 2')).toBeInTheDocument();
  });
});
