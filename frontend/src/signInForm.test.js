import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AuthContextProvider } from './AuthContext'; // Import the AuthContextProvider
import SignInForm from './signInForm';
import { ToastProvider } from 'react-toast-notifications';

const mockApi = {
  loginUser: jest.fn().mockResolvedValue({
    userObject: { username: 'testuser' },
    token: 'testtoken',
  }),
  registerUser: jest.fn(),
  login: jest.fn(),
};

describe('SignInForm component', () => {
  it('handles user login', async () => {
    const { getByLabelText, getByText } = render(
      <ToastProvider>
        <AuthContextProvider>
          <SignInForm api={mockApi} error="" />
        </AuthContextProvider>
      </ToastProvider>
    );

    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    fireEvent.click(getByText('Sign In'));

    // Expect loginUser to be called with the correct arguments
    expect(mockApi.loginUser).toHaveBeenCalledWith('testuser', 'testpassword');
  });

  it('handles user registration', async () => {
    const { getByLabelText, getByText } = render(
      <ToastProvider>
        <AuthContextProvider>
          <SignInForm api={mockApi} error="" />
        </AuthContextProvider>
      </ToastProvider>
    );

    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    fireEvent.click(getByText('Register'));

    // Expect registerUser to be called with the correct arguments
    expect(mockApi.registerUser).toHaveBeenCalledWith('testuser', 'testpassword');
  });
});
