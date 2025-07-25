// src/components/Navbar.tsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar: React.FC = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
    <div className="container">
      <Link to="/" className="navbar-brand">Recipe‑Room</Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink to="/login" className="nav-link">Login</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/register" className="nav-link">Register</NavLink>
          </li>
          {/* Add more nav links here like Home, Bookmarks, Groups */}
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
