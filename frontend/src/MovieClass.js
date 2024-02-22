import axios from 'axios';


class Movie {
  static async getMovieByTitle(title) {
    const options = {
      method: 'GET',
      url: `https://streaming-availability.p.rapidapi.com/search/title`,
      params: {
        title: title,
        country: 'us',
        show_type: 'movie',
        output_language: 'en'
      },
      headers: {
        'X-RapidAPI-Key': '6f10f06dcfmsh945f23a006f4e07p17b733jsn72cc69c7fd2e',
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      const results = response.data.result;

      const transformResults = (results) => {
        return results.slice(0, 10).map(result => ({
          title: result.title,
          overview: result.overview,
          streamingInfo: (result.streamingInfo && result.streamingInfo.us) ? result.streamingInfo.us.map(info => ({ service: info.service, link: info.link })).filter((value, index, self) => self.findIndex(obj => obj.service === value.service && obj.link === value.link) === index) : [],
          cast: result.cast,
          year: result.year,
          imdbId: result.imdbId,
          genres: result.genres.map(genre => genre.name),
          directors: result.directors
        }));
      };

      const transformedResults = transformResults(results);
      return transformedResults;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  static async getMoviePosterById(id) {
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
      console.log(response);
      const results = response.data.results;
      console.log(results);
      return results.primaryImage.url;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  static async getMovieDetailsByID(id) {
    const options = {
      method: 'GET',
      url: 'https://streaming-availability.p.rapidapi.com/get',
      params: {
        output_language: 'en',
        imdb_id: id
      },
      headers: {
        'X-RapidAPI-Key': '6f10f06dcfmsh945f23a006f4e07p17b733jsn72cc69c7fd2e',
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      const results = response.data.result;
      const transformResults = (result) => {
        return [{
          title: result.title,
          overview: result.overview,
          streamingInfo: (result.streamingInfo && result.streamingInfo.us) ? result.streamingInfo.us.map(info => ({ service: info.service, link: info.link })).filter((value, index, self) => self.findIndex(obj => obj.service === value.service && obj.link === value.link) === index) : [],
          cast: result.cast,
          year: result.year,
          imdbId: result.imdbId,
          genres: result.genres.map(genre => genre.name),
          directors: result.directors
        }];
      };

      const transformedResults = transformResults(results);
      return transformedResults;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}



export default Movie;
