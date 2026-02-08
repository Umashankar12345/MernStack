// Authentication utilities for frontend only
class AuthService {
  constructor() {
    this.currentUser = null;
    this.token = null;
    this.isAuthenticated = false;
    this.init();
  }

  // Initialize from localStorage
  init() {
    const user = localStorage.getItem('movieAppUser');
    const token = localStorage.getItem('movieAppToken');
    
    if (user && token) {
      this.currentUser = JSON.parse(user);
      this.token = token;
      this.isAuthenticated = true;
    }
  }

  // Mock login (simulates API call)
  async login(email, password) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // For demo - accept any email/password with min 6 chars
    if (!email || !password || password.length < 6) {
      throw new Error('Invalid credentials. Password must be at least 6 characters.');
    }

    // Generate mock user data
    const user = {
      id: Date.now(),
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      email: email,
      joinDate: new Date().toLocaleDateString(),
      avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=007bff&color=fff`,
      preferences: {
        notifications: true,
        language: 'English',
        theme: 'light'
      }
    };

    // Generate mock token
    const token = `mock_jwt_token_${Date.now()}_${Math.random().toString(36).substr(2)}`;

    // Save to localStorage
    localStorage.setItem('movieAppUser', JSON.stringify(user));
    localStorage.setItem('movieAppToken', token);

    // Update instance state
    this.currentUser = user;
    this.token = token;
    this.isAuthenticated = true;

    return {
      success: true,
      user,
      token,
      message: 'Login successful!'
    };
  }

  // Mock register
  async register(name, email, password) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (!name || !email || !password || password.length < 6) {
      throw new Error('All fields are required. Password must be at least 6 characters.');
    }

    // Check if user already exists (in localStorage)
    const existingUsers = JSON.parse(localStorage.getItem('movieAppUsers') || '[]');
    if (existingUsers.some(u => u.email === email)) {
      throw new Error('User with this email already exists.');
    }

    // Create new user
    const user = {
      id: Date.now(),
      name: name,
      email: email,
      joinDate: new Date().toLocaleDateString(),
      avatar: `https://ui-avatars.com/api/?name=${name}&background=28a745&color=fff`,
      preferences: {
        notifications: true,
        language: 'English',
        theme: 'light'
      }
    };

    // Generate mock token
    const token = `mock_jwt_token_${Date.now()}_${Math.random().toString(36).substr(2)}`;

    // Save to localStorage
    localStorage.setItem('movieAppUser', JSON.stringify(user));
    localStorage.setItem('movieAppToken', token);
    
    // Add to users list
    existingUsers.push({ email, password: '********' }); // Don't store real passwords
    localStorage.setItem('movieAppUsers', JSON.stringify(existingUsers));

    // Update instance state
    this.currentUser = user;
    this.token = token;
    this.isAuthenticated = true;

    return {
      success: true,
      user,
      token,
      message: 'Registration successful! Welcome to MovieApp.'
    };
  }

  // Mock logout
  logout() {
    localStorage.removeItem('movieAppUser');
    localStorage.removeItem('movieAppToken');
    
    this.currentUser = null;
    this.token = null;
    this.isAuthenticated = false;

    return { success: true, message: 'Logged out successfully.' };
  }

  // Check if user is authenticated
  checkAuth() {
    return this.isAuthenticated;
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser;
  }

  // Get token
  getToken() {
    return this.token;
  }

  // Update user profile
  async updateProfile(updates) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (!this.currentUser) {
      throw new Error('Not authenticated');
    }

    // Update user data
    this.currentUser = { ...this.currentUser, ...updates };
    
    // Save to localStorage
    localStorage.setItem('movieAppUser', JSON.stringify(this.currentUser));

    return {
      success: true,
      user: this.currentUser,
      message: 'Profile updated successfully.'
    };
  }

  // Change password
  async changePassword(oldPassword, newPassword) {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    if (!this.currentUser) {
      throw new Error('Not authenticated');
    }

    if (newPassword.length < 6) {
      throw new Error('New password must be at least 6 characters.');
    }

    return {
      success: true,
      message: 'Password changed successfully.'
    };
  }

  // Forgot password (mock)
  async forgotPassword(email) {
    await new Promise(resolve => setTimeout(resolve, 700));
    
    return {
      success: true,
      message: `Password reset link sent to ${email}. Check your email.`,
      resetToken: `reset_token_${Date.now()}`
    };
  }

  // Reset password (mock)
  async resetPassword(token, newPassword) {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    if (newPassword.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }

    return {
      success: true,
      message: 'Password reset successful. You can now login with your new password.'
    };
  }
}

// Create singleton instance
const authService = new AuthService();

// Export instance and class
export default authService;
export { AuthService };