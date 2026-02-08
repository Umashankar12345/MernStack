import { useState, useCallback } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [navigation, setNavigation] = useState(null);

  const register = useCallback(async (userData, redirectTo = '/') => {
    setLoading(true);
    try {
      // Get existing users
      const users = JSON.parse(localStorage.getItem('movieAppUsers') || '[]');
      
      // Check if user exists
      const existingUser = users.find(u => u.email === userData.email);
      if (existingUser) {
        throw new Error('User already exists with this email');
      }

      // Create new user
      const newUser = {
        ...userData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        bookings: []
      };

      // Save to localStorage
      users.push(newUser);
      localStorage.setItem('movieAppUsers', JSON.stringify(users));
      localStorage.setItem('movieAppUser', JSON.stringify(newUser));
      
      setUser(newUser);
      
      // Navigate if navigation is set
      if (navigation) {
        navigation(redirectTo);
      }
      
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [navigation]);

  const login = useCallback(async (credentials, redirectTo = '/') => {
    setLoading(true);
    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('movieAppUsers') || '[]');
      
      // Find user
      const foundUser = users.find(
        u => u.email === credentials.email && u.password === credentials.password
      );

      if (!foundUser) {
        throw new Error('Invalid email or password');
      }

      // Set user in state and localStorage
      localStorage.setItem('movieAppUser', JSON.stringify(foundUser));
      setUser(foundUser);
      
      // Navigate if navigation is set
      if (navigation) {
        navigation(redirectTo);
      }
      
      return { success: true, user: foundUser };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [navigation]);

  const logout = useCallback(() => {
    localStorage.removeItem('movieAppUser');
    setUser(null);
    if (navigation) {
      navigation('/');
    }
  }, [navigation]);

  const updateProfile = useCallback((updatedData) => {
    if (!user) return { success: false, error: 'No user logged in' };

    try {
      const users = JSON.parse(localStorage.getItem('movieAppUsers') || '[]');
      const updatedUsers = users.map(u => 
        u.id === user.id ? { ...u, ...updatedData } : u
      );
      
      localStorage.setItem('movieAppUsers', JSON.stringify(updatedUsers));
      
      const updatedUser = { ...user, ...updatedData };
      localStorage.setItem('movieAppUser', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      return { success: true, user: updatedUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [user]);

  const addBooking = useCallback((booking) => {
    if (!user) return { success: false, error: 'No user logged in' };

    try {
      const users = JSON.parse(localStorage.getItem('movieAppUsers') || '[]');
      const updatedUsers = users.map(u => {
        if (u.id === user.id) {
          return {
            ...u,
            bookings: [...(u.bookings || []), booking]
          };
        }
        return u;
      });
      
      localStorage.setItem('movieAppUsers', JSON.stringify(updatedUsers));
      
      const updatedUser = {
        ...user,
        bookings: [...(user.bookings || []), booking]
      };
      
      localStorage.setItem('movieAppUser', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      return { success: true, user: updatedUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [user]);

  return {
    user,
    loading,
    register,
    login,
    logout,
    updateProfile,
    addBooking,
    setNavigation
  };
};