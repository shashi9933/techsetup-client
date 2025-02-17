import React, { createContext, useContext, useState } from 'react';

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  const login = async (credentials) => {
    try {
      // Temporary hardcoded credentials for development
      if (credentials.email === 'kuchbhi@gmail.com' && credentials.password === 'qwerty12@A') {
        const mockUser = {
          id: 1,
          name: 'Admin User',
          email: 'kuchbhi@gmail.com',
          role: 'admin'
        };
        
        setAdminUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('adminToken', 'mock-token');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminUser(null);
    localStorage.removeItem('adminToken');
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, adminUser, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext); 