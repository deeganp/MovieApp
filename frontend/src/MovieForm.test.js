import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MovieForm from './MovieForm';

// Mock dependencies
jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(() => ({
    push: jest.fn(),
  })),
}));
jest.mock('react-toast-notifications', () => ({
  useToasts: jest.fn(() => ({
    addToast: jest.fn(),
  })),
}));
jest.mock('./MovieClass', () => ({
  getMovieByTitle: jest.fn(() => Promise.resolve([])),
}));

describe('MovieForm', () => {
  it('should render search input and button', () => {
    const { getByPlaceholderText, getByText } = render(<MovieForm />);
    expect(getByPlaceholderText('Search for a movie...')).toBeInTheDocument();
    expect(getByText('Search!')).toBeInTheDocument();
  });

  it('should call handleSubmit when form is submitted', async () => {
    const { getByPlaceholderText, getByText } = render(<MovieForm />);
    const input = getByPlaceholderText('Search for a movie...');
    const button = getByText('Search!');

    fireEvent.change(input, { target: { value: 'Harry Potter' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(input.value).toBe('Harry Potter');
      expect(button).toBeDisabled();
    });
  });

  it('should show warning toast if search input is empty', async () => {
    const { getByText } = render(<MovieForm />);
    const button = getByText('Search!');

    fireEvent.click(button);

    await waitFor(() => {
      expect(getByText('Please enter a movie name')).toBeInTheDocument();
    });
  });

  // Add more test cases as needed
});
