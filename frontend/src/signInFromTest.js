import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignInForm from './signInForm';
import * as AuthApi from './AuthApi'; // Import your authentication API functions

// Mock the AuthApi functions
jest.mock('./AuthApi');

describe('SignInForm component', () => {
  it('handles user login', async () => {
    // Mock the loginUser function to return a user and token
    AuthApi.loginUser.mockResolvedValue({
      userObject: { username: 'testuser' },
      token: 'testtoken',
    });

    // Mock the useAuth hook
    const useAuthMock = {
      login: jest.fn(),
    };

    jest.spyOn(require('./AuthContext'), 'useAuth').mockReturnValue(useAuthMock);

    render(<SignInForm api={AuthApi} error="" />);

    // Find the username and password input fields
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');

    // Enter the username and password
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    // Find and click the "Sign In" button
    const signInButton = screen.getByText('Sign In');
    fireEvent.click(signInButton);

    // Wait for the login to be called with the correct username
    await waitFor(() => {
      expect(AuthApi.loginUser).toHaveBeenCalledWith('testuser', 'testpassword');
      expect(useAuthMock.login).toHaveBeenCalledWith('testuser');
      expect(localStorage.getItem('token')).toBe('testtoken');
    });
  });

  it('handles user registration', async () => {
    // Mock the registerUser function to return a user
    AuthApi.registerUser.mockResolvedValue({ username: 'testuser' });

    // Mock the useAuth hook
    const useAuthMock = {
      login: jest.fn(),
    };

    jest.spyOn(require('./AuthContext'), 'useAuth').mockReturnValue(useAuthMock);

    render(<SignInForm api={AuthApi} error="" />);

    // Find the username and password input fields
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');

    // Enter the username and password
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    // Find and click the "Register" button
    const registerButton = screen.getByText('Register');
    fireEvent.click(registerButton);

    // Wait for the registration to be called with the correct username
    await waitFor(() => {
      expect(AuthApi.registerUser).toHaveBeenCalledWith('testuser', 'testpassword');
      expect(useAuthMock.login).toHaveBeenCalledWith({ username: 'testuser' });
    });
  });
});
