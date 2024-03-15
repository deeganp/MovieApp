import React from 'react';
import './banner.css'; 
import { useAuth } from './AuthContext';

const Banner = () => {
  const { user } = useAuth();
  return (
    <header className="masthead">
      <div className="container px-5">
        <div className="row gx-5 align-items-center">
          <div className="col-lg-6">
            <div className="mb-5 mb-lg-0 text-center">
              <h1 className="display-1 lh-1 mb-3">Cinema Exp.</h1>
              <h3>Find your favorite movies and save them for later!</h3>
              <h3>Click on Search Movies to begin!</h3>
              <h3>{user ? `Welcome, ${user}!` : 'Welcome to the site!'}</h3>
              {/* Add app badges here if applicable */}
            </div>
          </div>
          <div className="col-lg-6">
            {/* Optionally, include a mockup device */}
            <div className="masthead-device-mockup">
              {/* Mockup device content */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};


export default Banner;
