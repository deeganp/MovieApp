import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useToasts } from 'react-toast-notifications';
import './signInForm.css'


const SignInForm = ({ api, error, setAuthenticated  }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { addToast } = useToasts();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Call the sign-in function and pass the username and password
      const res = await api.loginUser(username, password);
      login(res.userObject.username);
      localStorage.setItem('token', res.token);
      addToast('User logged in successfully!', { appearance: 'success', autoDismiss: true });
      setAuthenticated(true);
      setUsername('');
      setPassword('');
    } catch (error) {
      // Handle the failed sign-in and show an alert
      console.error('Log In Failed', error);
      addToast('Login failed. Please check your credentials and try again.',{appearance: 'error', autoDismiss: true});
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Call the register function and pass the username and password
      await api.registerUser(username, password);
      addToast('User registered successfully!' , {appearance: 'success', autoDismiss: true});
      setUsername('');
      setPassword('');
    } catch (error) {
      // Handle registration error here
      console.error('Registration failed:', error);
      addToast('Registration failed. Please try again.', {appearance: 'error', autoDismiss: true});
    }
  };


  return (
    <div>
      <h2 className='title'>Sign In or Register</h2>
      <form className='form'>
        <div className="form-group">
          <label htmlFor="username" className='label'>Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='input'
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className='label'>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='input'
          />
        </div>
        <button onClick={handleLogin} className='button'>Sign In</button>
        <button onClick={handleRegister} className='button'>Register</button>
      </form>
    </div>
  );
};

export default SignInForm;
