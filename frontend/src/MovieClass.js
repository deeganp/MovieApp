import axios from 'axios';


class Movie {
  static async getMovieByTitle(title) {
    const options = {
      method: 'GET',
      url: `https://moviesdatabase.p.rapidapi.com/titles/search/title/${title}`,
      params: {
        exact: 'false',
        titleType: 'movie'
      },
      headers: {
        'X-RapidAPI-Key': '6f10f06dcfmsh945f23a006f4e07p17b733jsn72cc69c7fd2e',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      const results = response.data.results;

      const titles = results.slice(0, 10).map(result => ({
        title: result.titleText ? result.titleText.text : '',
        imdbID: result.id
      }));

      return titles
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  static async getMovieById(id) {
    const options = {
      method: 'GET',
      url: `https://moviesdatabase.p.rapidapi.com/titles/${id}`,
      headers: {
        'X-RapidAPI-Key': '6f10f06dcfmsh945f23a006f4e07p17b733jsn72cc69c7fd2e',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      return response.data.results;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}



export default Movie;
