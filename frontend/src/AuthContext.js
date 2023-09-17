import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

 const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Set the user when logging in
    setUser(userData);
  };

  const logout = () => {
    // Clear the user when logging out
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContextProvider, useAuth };
