import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import jwtDecode from 'jwt-decode';

import './App.css';
import Banner from './banner';
import NavBar from './NavBar';
import SearchMovie from './MovieForm';
import MovieList from './MovieList';
import SignInForm from './signInForm';
import Favorites from './favorites';
import MovieAppApi from './api';
import HomeVid from './homeVid';
import MovieDetailsPage from './MovieDetailsPage';
import { useAuth } from './AuthContext';




function App() {
  const api = new MovieAppApi();
  const { login } = useAuth();

  const [movies, setMovies] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);

  const handleGetMovies = (movieData) => {
    setMovies(movieData);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken && isTokenValid(storedToken)) {
      loginUserWithToken(storedToken);
      console.log('condition met for auto');
    }
  }, []);
  function isTokenValid(token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      return decodedToken.exp > currentTime; // Check if the token is not expired
    } catch (error) {
      return false;
    }
  }


  async function loginUserWithToken(token) {
    try {
      const response = await api.loginUser(null, null, token);
      login(response.userObject.username);
      // Assuming your loginUser method returns the user's data upon successful login
      setAuthenticated(true);
      console.log('Auto login successful!', response);
    } catch (error) {
      console.error('Auto login failed', error);
      // Handle auto login failure, e.g., remove the token from localStorage
      localStorage.removeItem('token');
    }
  }

  return (
    <ToastProvider>
      <div className="background-container">
        <div className="App">
          <header className="App-header">
            <Banner />
          </header>
          <BrowserRouter>
            <NavBar />
            <main>
              <Switch>
                <Route exact path="/">
                  <HomeVid />
                </Route>
                <Route exact path="/searchmovies">
                  <SearchMovie SetMovies={handleGetMovies} />
                </Route>
                <Route exact path="/results">
                  <MovieList api={api} movies={movies} />
                </Route>
                <Route exact path = "/MovieDetails">
                  <MovieDetailsPage />
                </Route>
                <Route exact path="/signin">
                  <SignInForm setAuthenticated={setAuthenticated} api={api} />
                </Route>
                <Route exact path="/favorites">
                  {authenticated ? (
                    <Favorites api={api} />
                  ) : (
                    <Redirect to="/signin" />
                  )}
                </Route>
              </Switch>
            </main>
          </BrowserRouter>
        </div>
      </div>
    </ToastProvider>
  );
}

export default App;
