import React, {useState} from 'react';
import './App.css';
import Banner from './banner';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from './NavBar';
import SearchMovie from './MovieForm';
import MovieList from './MovieList';
import SignInForm from './signInForm';
import Favorites from './favorites';
import { AuthContextProvider } from './AuthContext';
import MovieAppApi from './api';


function App() {
  const api = new MovieAppApi();

  const [movies, setMovies] = useState([]);

  const handleGetMovies = (movieData) => {
    setMovies(movieData);
  };
  return (

    <div className="App">
      <AuthContextProvider>
        <header className="App-header">
          <Banner />
        </header>
        <BrowserRouter>
          <NavBar />
          <main>
            <Switch>
              <Route exact path="/searchmovies">
                <SearchMovie SetMovies={handleGetMovies} />
              </Route>
              <Route exact path="/results">
                <MovieList api={api} movies={movies} />
              </Route>
              <Route exact path="/signin">
                <SignInForm api={api} />
              </Route>
              <Route exact path="/favorites">
                <Favorites api={api} />
              </Route>
            </Switch>
          </main>
        </BrowserRouter>
      </AuthContextProvider>
    </div>

  );
}

export default App;
