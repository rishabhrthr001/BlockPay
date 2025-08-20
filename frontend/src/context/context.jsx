import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext({
  isAuthenticated: false,
  userName: null,
  role: null,
  token: null,
  salary: 0,
  joinDate: 0,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const [salary, setSalary] = useState(0);
  const [joinDate, setJoinDate] = useState(0);
  const login = (name, role, token, salary, joinDate) => {
    if ((name, role, token)) {
      setIsAuthenticated(true);
      setUserName(name);
      setRole(role);
      setToken(token);
      setSalary(salary);
      setJoinDate(joinDate);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserName(null);
    setToken(null);
    setSalary(null);
    setJoinDate(null);
    toast.success("logged out");
  };

  const value = {
    isAuthenticated,
    userName,
    role,
    token,
    salary,
    joinDate,
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
