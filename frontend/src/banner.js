import React from 'react';
import './banner.css'; 
import { useAuth } from './AuthContext';

const Banner = () => {
  const {user} = useAuth();
  return (
    <div className="banner">
      <h1>Cinema Exp.</h1>
      <h2> Find your favorite movies and save them for later!</h2>
      <h2>Click on Search Movies to begin!</h2>
      <h3>
        {user ? `Welcome, ${user}!` : 'Welcome to the site!'}
      </h3>
    </div>
  );
};

export default Banner;
