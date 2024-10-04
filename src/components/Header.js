import React from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css';



function Header() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/about">About Us</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
    </nav>
  );
}

export default Header;
