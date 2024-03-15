import React from 'react';
import './favorites.css';

const NoFavorites = () => {
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">No current favorites</h5>
              <p className="card-text">Go to search movies to find a movie and favorite it!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoFavorites;
