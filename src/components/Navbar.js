import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Job Tracker</Link>
      <div className="navbar-links">
        <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link>
        <Link to="/applications" className={location.pathname.startsWith('/applications') ? 'active' : ''}>
          Applications
        </Link>
      </div>
      <div className="navbar-user">
        <span className="user-name">{user?.name || user?.email}</span>
        <button onClick={handleLogout} className="btn btn-sm btn-secondary">Logout</button>
      </div>
    </nav>
  );
}
