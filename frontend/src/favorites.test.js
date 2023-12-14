import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Favorites from './favorites';
import MovieAppApi from './api';

jest.mock('./api'); // Mock the MovieAppApi module

// Create a mock user for testing
const mockUser = { username: 'testuser' };

describe('Favorites component', () => {
  beforeEach(() => {
    MovieAppApi.mockClear();
    MovieAppApi.mockImplementation(() => ({
      getFavorites: async () => ['Movie 1', 'Movie 2'], // Mock the getFavorites method
    }));
  });

  it('fetches and displays user favorites', async () => {
    render(
      <MemoryRouter>
        <Favorites />
      </MemoryRouter>
    );

    // Simulate the user being authenticated
    act(() => {
      // Mock the useAuth hook to provide a user
      jest.spyOn(require('./AuthContext'), 'useAuth').mockReturnValue({ user: mockUser });

      // Ensure that the loading state is displayed initially
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    // Wait for the favorites to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('My Favorites')).toBeInTheDocument();
      expect(screen.getByText('Movie 1')).toBeInTheDocument();
      expect(screen.getByText('Movie 2')).toBeInTheDocument();
    });
  });

  it('handles the case when no user is logged in', async () => {
    const historyPushMock = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useHistory').mockReturnValue({ push: historyPushMock });

    render(
      <MemoryRouter>
        <Favorites />
      </MemoryRouter>
    );

    // Ensure that the loading state is displayed initially
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for the redirect to the login page
    await waitFor(() => {
      expect(historyPushMock).toHaveBeenCalledWith('/');
    });
  });
});
