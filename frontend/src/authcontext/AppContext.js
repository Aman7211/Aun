// authcontext/AppContext.js

import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [authdetails, setAuthDetails] = useState({
    authState: false,
    token: localStorage.getItem("token") || null,
    userId: localStorage.getItem("userId") || null, // Retrieve user ID from localStorage
  });

  useEffect(() => {
    if (authdetails.token) {
      setAuthDetails({ ...authdetails, authState: true });
    }
  }, []);

  const login = (token, userId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId); // Store user ID in localStorage
    setAuthDetails({ authState: true, token, userId });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId"); // Remove user ID from localStorage
    setAuthDetails({ authState: false, token: null, userId: null });
  };

  return (
    <AppContext.Provider value={{ authdetails, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};
