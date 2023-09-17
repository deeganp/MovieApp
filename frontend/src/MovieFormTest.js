import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchMovie from './SearchMovie';
import Movie from './MovieClass';

jest.mock('./MovieClass'); // Mock the MovieClass module

describe('SearchMovie component', () => {
  it('fetches and displays movie data on form submission', async () => {
    // Mock the getMovieByTitle function to return mock movie data
    Movie.getMovieByTitle.mockResolvedValue({ title: 'Test Movie' });

    const setMoviesMock = jest.fn();

    render(<SearchMovie SetMovies={setMoviesMock} />);

    // Find the input field and enter a movie name
    const inputElement = screen.getByPlaceholderText('Search for a movie...');
    fireEvent.change(inputElement, { target: { value: 'Test Movie' } });

    // Find the submit button and click it
    const submitButton = screen.getByText('Search!');
    fireEvent.click(submitButton);

    // Verify that Movie.getMovieByTitle was called with the correct movie name
    await waitFor(() => {
      expect(Movie.getMovieByTitle).toHaveBeenCalledWith('Test Movie');
    });

    // Verify that setMoviesMock was called with the movie data
    expect(setMoviesMock).toHaveBeenCalledWith({ title: 'Test Movie' });

    // Verify that the history.push function was called with the correct route
    expect(historyMock.push).toHaveBeenCalledWith('/results');
  });

  it('handles errors when fetching movie data', async () => {
    // Mock the getMovieByTitle function to throw an error
    Movie.getMovieByTitle.mockRejectedValue(new Error('Movie not found'));

    const setMoviesMock = jest.fn();

    render(<SearchMovie SetMovies={setMoviesMock} />);

    // Find the input field and enter a movie name
    const inputElement = screen.getByPlaceholderText('Search for a movie...');
    fireEvent.change(inputElement, { target: { value: 'Non-Existent Movie' } });

    // Find the submit button and click it
    const submitButton = screen.getByText('Search!');
    fireEvent.click(submitButton);

    // Verify that Movie.getMovieByTitle was called with the correct movie name
    await waitFor(() => {
      expect(Movie.getMovieByTitle).toHaveBeenCalledWith('Non-Existent Movie');
    });

    // Verify that setMoviesMock was not called (due to the error)
    expect(setMoviesMock).not.toHaveBeenCalled();

    // Verify that the error message is displayed
    expect(screen.getByText('Error fetching movie data;')).toBeInTheDocument();
  });
});
