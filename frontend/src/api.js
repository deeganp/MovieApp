// api.js

import axios from 'axios';

class MovieAppApi {
  constructor() {
    // Initialize your API base URL to localhost:3001
    this.apiBase = 'http://localhost:3001';
  }

   async registerUser(username, password) {
    try {
      // Make a POST request to register a new user
      const response = await axios.post(`${this.apiBase}/users/register`, {
        username,
        password,
      });
      return response.data; // Return registration result (e.g., success message)
    } catch (error) {
      throw new Error('Registration failed');
    }
  }

  async loginUser(username, password, token = null) {
    try {
      if(token){
        const res = await axios.post(`${this.apiBase}/users/login`, { token });
        return res.data;
      } else {
      // Make a POST request to log in
      const response = await axios.post(`${this.apiBase}/users/login`, {
        username,
        password,
      });
      return response.data; // Return authentication result (e.g., token)
     }
    } catch (error) {
      throw new Error('Login failed');
    }
  }

  async addFavorite(username, movieName, movieImdbId) {
    try {
      // Make a POST request to add a favorite movie
      const response = await axios.post(`${this.apiBase}/users/favorites/add`, {
        username,
        movieName,
        movieImdbId
      });
      return response.data; 
      
      // Return result (e.g., success message)
    } catch (error) {
      throw new Error('Failed to add favorite movie');
    }
  }

  async getFavorites(username) {
    try {
      // Make a GET request to retrieve user favorites
      const response = await axios.get(`${this.apiBase}/users/${username}/favorites`);
  
      // Extract favorites from the response
      const { favorites } = response.data;
      console.log(favorites);
      return favorites;
    } catch (error) {
      throw new Error('Failed to retrieve user favorites');
    }
  }

  async deleteFavorite(username, movieName, movieImdbId) {
    try {
      // Make a DELETE request to delete a favorite movie
      const response = await axios.delete(`${this.apiBase}/users/favorites/delete`, {
        data: { username, movieName, movieImdbId }, // Send username and movieName in the request body
      });
      
      return response.data; // Return result (e.g., success message)
    } catch (error) {
      throw new Error('Failed to delete favorite movie');
    }
  }
}

export default MovieAppApi;
