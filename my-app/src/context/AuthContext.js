import React, { createContext, useContext, useState } from 'react';
import  fetchData  from '../utils/fetchToken';
import axios from 'axios';


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/login`, {username, password});
      const data = (response.data)[0];
      console.log(data);
      setUser({ username }); 
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  const signUp = async (username, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/signup`, {username, password});
      const data = await response.data;
    } catch (error) {
      console.error("signUp failed:", error);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
