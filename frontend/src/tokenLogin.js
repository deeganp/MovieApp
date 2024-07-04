import jwtDecode from 'jwt-decode';
import MovieAppApi from './api';




function isTokenValid(token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      return decodedToken.exp > currentTime; // Check if the token is not expired
    } catch (error) {
      return false;
    }
  }


  async function loginUserWithToken(token, login, setAuthenticated) {
    try {
      
      const api = new MovieAppApi();
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


  const tokenLogin = {
    isTokenValid,
    loginUserWithToken
  };

  export default tokenLogin;