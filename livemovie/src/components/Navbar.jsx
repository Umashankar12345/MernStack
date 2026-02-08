import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>🎬 MovieApp</Link>
        <div style={styles.navLinks}>
          <Link to="/" style={styles.link}>Home</Link>
          {user ? (
            <>
              <Link to="/profile" style={styles.link}>Profile</Link>
              <button onClick={onLogout} style={styles.logoutBtn}>Logout</button>
              <span style={styles.userName}>Hi, {user.name}</span>
            </>
          ) : (
            <Link to="/auth" style={styles.link}>Login/Register</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#333',
    color: 'white',
    padding: '15px 0',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    padding: '5px 10px',
    borderRadius: '3px',
    transition: 'background-color 0.3s',
  },
  linkHover: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  logoutBtn: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  userName: {
    color: '#ffc107',
    fontSize: '14px',
    padding: '5px 10px',
    backgroundColor: 'rgba(255,193,7,0.1)',
    borderRadius: '3px',
  },
};

export default Navbar;