import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useToasts } from 'react-toast-notifications';
import './signInForm.css'


const SignInForm = ({ api, error, setAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { addToast } = useToasts();

  useEffect(() => {
    addToast(`Please Sign In To View Favorites`, { appearance: 'info', autoDismiss: true });
  }, [addToast]);

  const handleLogin = async (e) => {
    e.preventDefault();
    addToast(`Signing In...`, { appearance: 'info', autoDismiss: true });
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
      addToast('Login failed. Please check your credentials and try again.', { appearance: 'error', autoDismiss: true });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    addToast(`Creating Account...`, { appearance: 'info', autoDismiss: true });
    try {
      // Call the register function and pass the username and password
      await api.registerUser(username, password);
      addToast('User registered successfully!', { appearance: 'success', autoDismiss: true });
      setUsername('');
      setPassword('');
    } catch (error) {
      // Handle registration error here
      console.error('Registration failed:', error);
      addToast('Registration failed. Please try again.', { appearance: 'error', autoDismiss: true });
    }
  };


  return (
    <div className="container px-5">
      <div className="row gx-5 align-items-center justify-content-center">
        <div className="col-lg-6">
          <div className="mb-5 mb-lg-0 text-center">
            <p className="display-4 lh-1 mb-3">Sign In or Register</p>
            <form className="form">
              <div className="form-group">
                <label htmlFor="username" className='label'>Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className='input form-control'
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className='label'>Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='input form-control'
                />
              </div>
              <div className="form-group">
                <button onClick={handleLogin} className='custom-btn'>Sign In</button> 
                <button onClick={handleRegister} className='custom-btn'>Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
