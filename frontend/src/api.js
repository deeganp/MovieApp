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

  async loginUser(username, password) {
    try {
      // Make a POST request to log in
      const response = await axios.post(`${this.apiBase}/users/login`, {
        username,
        password,
      });
      return response.data; // Return authentication result (e.g., token)
    } catch (error) {
      throw new Error('Login failed');
    }
  }

  async addFavorite(username, movieName) {
    try {
      // Make a POST request to add a favorite movie
      const response = await axios.post(`${this.apiBase}/users/favorites/add`, {
        username,
        movieName,
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
  
      return favorites;
    } catch (error) {
      throw new Error('Failed to retrieve user favorites');
    }
  }
  
}

export default MovieAppApi;
