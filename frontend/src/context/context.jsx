import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext({
  isAuthenticated: false,
  userName: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState(null);
  const login = (name) => {
    if (name) {
      setIsAuthenticated(true);
      setUserName(name);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserName(null);
    toast.success("logged out");
  };

  const value = {
    isAuthenticated,
    userName,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
