// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [navigateCallback, setNavigateCallback] = useState(null);

  // Store keys
  const STORAGE_KEYS = {
    USER: 'bookmyshow_user',
    TOKEN: 'bookmyshow_token',
    EXPIRY: 'bookmyshow_token_expiry'
  };

  // Check if token is expired
  const isTokenExpired = useCallback(() => {
    const expiry = localStorage.getItem(STORAGE_KEYS.EXPIRY);
    if (!expiry) return true;
    return Date.now() > parseInt(expiry);
  }, []);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
        
        if (storedUser && token && !isTokenExpired()) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } else {
          // Clear expired/invalid session
          clearSession();
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        clearSession();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [isTokenExpired]);

  // Clear session data
  const clearSession = () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.EXPIRY);
    setUser(null);
  };

  // Auto-logout on token expiry
  useEffect(() => {
    const checkTokenExpiry = setInterval(() => {
      if (user && isTokenExpired()) {
        logout('Session expired. Please login again.');
      }
    }, 60000); // Check every minute

    return () => clearInterval(checkTokenExpiry);
  }, [user, isTokenExpired]);

  // Set navigation callback (to be called from components)
  const setNavigation = (callback) => {
    setNavigateCallback(() => callback);
  };

  // Login function
  const login = async (userData, redirectPath = '/') => {
    try {
      setError(null);
      
      if (!userData) {
        throw new Error('Invalid login credentials');
      }

      const mockToken = `mock_jwt_${Date.now()}_${Math.random().toString(36).substr(2)}`;
      const expiryTime = Date.now() + (24 * 60 * 60 * 1000);
      
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
      localStorage.setItem(STORAGE_KEYS.TOKEN, mockToken);
      localStorage.setItem(STORAGE_KEYS.EXPIRY, expiryTime.toString());
      
      setUser(userData);
      
      // Use navigation callback if available
      if (navigateCallback) {
        navigateCallback(redirectPath);
      }
      
      return { success: true, user: userData };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Register function
  const register = async (userData, redirectPath = '/') => {
    try {
      setError(null);
      
      if (!userData) {
        throw new Error('Invalid registration data');
      }

      const mockToken = `mock_jwt_${Date.now()}_${Math.random().toString(36).substr(2)}`;
      const expiryTime = Date.now() + (24 * 60 * 60 * 1000);
      
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
      localStorage.setItem(STORAGE_KEYS.TOKEN, mockToken);
      localStorage.setItem(STORAGE_KEYS.EXPIRY, expiryTime.toString());
      
      setUser(userData);
      
      if (navigateCallback) {
        navigateCallback(redirectPath);
      }
      
      return { success: true, user: userData };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Logout function
  const logout = (message = 'Logged out successfully') => {
    clearSession();
    setError(message);
    return { success: true, message };
  };

  // Update user profile
  const updateUser = (updatedData) => {
    try {
      const updatedUser = { ...user, ...updatedData };
      setUser(updatedUser);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
      return { success: true };
    } catch (err) {
      console.error('Update user error:', err);
      return { success: false, error: err.message };
    }
  };

  // Check if user is authenticated
  const isAuthenticated = useCallback(() => {
    return !!(user && localStorage.getItem(STORAGE_KEYS.TOKEN) && !isTokenExpired());
  }, [user, isTokenExpired]);

  // Get auth token
  const getToken = () => {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated,
    getToken,
    setNavigation,
    clearError: () => setError(null)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ CORRECT: Export hook OUTSIDE the Provider function
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// ❌ REMOVE: export default AuthContext;