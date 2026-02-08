import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserAuth = ({ onLogin }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const userData = {
      name: isLogin ? 'Demo User' : formData.name,
      email: formData.email,
      id: Date.now(),
      joinDate: new Date().toLocaleDateString()
    };

    onLogin(userData);
    alert(`✅ ${isLogin ? 'Login successful!' : 'Registration successful!'}\nWelcome ${userData.name}!`);
    navigate('/');
  };

  return (
    <div className="container" style={styles.container}>
      <div style={styles.authCard}>
        <div style={styles.tabs}>
          <button
            onClick={() => setIsLogin(true)}
            style={{
              ...styles.tab,
              ...(isLogin ? styles.activeTab : {})
            }}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            style={{
              ...styles.tab,
              ...(!isLogin ? styles.activeTab : {})
            }}
          >
            Register
          </button>
        </div>

        <h2 style={styles.title}>
          {isLogin ? 'Welcome Back!' : 'Create Account'}
        </h2>
        <p style={styles.subtitle}>
          {isLogin 
            ? 'Login to book your movie tickets' 
            : 'Register to start booking movies'}
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <div className="form-group">
              <label style={styles.label}>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your full name"
                style={{
                  ...styles.input,
                  ...(errors.name ? styles.inputError : {})
                }}
              />
              {errors.name && <span style={styles.error}>{errors.name}</span>}
            </div>
          )}

          <div className="form-group">
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your email"
              style={{
                ...styles.input,
                ...(errors.email ? styles.inputError : {})
              }}
            />
            {errors.email && <span style={styles.error}>{errors.email}</span>}
          </div>

          <div className="form-group">
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your password"
              style={{
                ...styles.input,
                ...(errors.password ? styles.inputError : {})
              }}
            />
            {errors.password && <span style={styles.error}>{errors.password}</span>}
          </div>

          {!isLogin && (
            <div className="form-group">
              <label style={styles.label}>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-control"
                placeholder="Confirm your password"
                style={{
                  ...styles.input,
                  ...(errors.confirmPassword ? styles.inputError : {})
                }}
              />
              {errors.confirmPassword && (
                <span style={styles.error}>{errors.confirmPassword}</span>
              )}
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={styles.submitBtn}>
            {isLogin ? 'Login' : 'Register'}
          </button>

          <p style={styles.switchText}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              style={styles.switchBtn}
            >
              {isLogin ? 'Register here' : 'Login here'}
            </button>
          </p>

          <div style={styles.demoNote}>
            <p>💡 Demo Credentials:</p>
            <p>Email: demo@example.com</p>
            <p>Password: any password (min 6 characters)</p>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 100px)',
    padding: '20px',
  },
  authCard: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '40px',
    boxShadow: '0 5px 25px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '450px',
  },
  tabs: {
    display: 'flex',
    marginBottom: '30px',
    borderBottom: '2px solid #eee',
  },
  tab: {
    flex: '1',
    padding: '15px',
    border: 'none',
    background: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: '#666',
  },
  activeTab: {
    color: '#007bff',
    borderBottom: '3px solid #007bff',
    marginBottom: '-2px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '10px',
    color: '#333',
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: '30px',
  },
  form: {
    width: '100%',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'border 0.3s',
  },
  inputError: {
    borderColor: '#dc3545',
  },
  error: {
    color: '#dc3545',
    fontSize: '14px',
    marginTop: '5px',
    display: 'block',
  },
  submitBtn: {
    width: '100%',
    padding: '15px',
    fontSize: '18px',
    marginTop: '20px',
  },
  switchText: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#666',
  },
  switchBtn: {
    background: 'none',
    border: 'none',
    color: '#007bff',
    cursor: 'pointer',
    fontSize: '16px',
    textDecoration: 'underline',
  },
  demoNote: {
    marginTop: '30px',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#666',
  },
};

export default UserAuth;