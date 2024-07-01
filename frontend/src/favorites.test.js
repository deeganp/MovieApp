import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import Favorites from './favorites';
import MovieAppApi from './api';
import { useAuth } from './AuthContext';
import { useHistory } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'; 

jest.mock('./api'); // Mock the MovieAppApi module
jest.mock('./AuthContext'); // Mock the AuthContext module
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(),
}));

const mockUser = { username: 'testuser' };

describe('Favorites component', () => {
  beforeEach(() => {
    MovieAppApi.mockClear();
    MovieAppApi.mockImplementation(() => ({
      getFavorites: async () => [
        { imdbId: '1', title: 'Movie 1' },
        { imdbId: '2', title: 'Movie 2' },
      ],
    }));
  });

  it('fetches and displays user favorites', async () => {
    useAuth.mockReturnValue({ user: mockUser });

    await act(async () => {
      render(
        <ToastProvider>
          <MemoryRouter>
            <Favorites />
          </MemoryRouter>
        </ToastProvider>
      );
    });


    expect(await screen.findByText('My Favorites')).toBeInTheDocument();
    expect(await screen.findByText('Movie 1')).toBeInTheDocument();
    expect(await screen.findByText('Movie 2')).toBeInTheDocument();
  });

  it('handles the case when no user is logged in', async () => {
    const historyPushMock = jest.fn();
    useHistory.mockReturnValue({ push: historyPushMock });
    useAuth.mockReturnValue({ user: null });

    await act(async () => {
      render(
        <ToastProvider>
          <MemoryRouter>
            <Favorites />
          </MemoryRouter>
        </ToastProvider>
      );
    });

   // Ensure "Loading..." is displayed

    await act(async () => {
      expect(historyPushMock).toHaveBeenCalledWith('/signin');
    });
  });
});
