import React, { useState, useEffect } from 'react';
import { Route, Routes, NavLink, useNavigate } from 'react-router-dom';

import Home from './components/Home';
import SignUp from './components/Signup';
import Login from './components/Login';
import BikeOptions from './components/BikeOptions';
import Profile from './components/Profile';
import ServiceStatus from './components/ServiceStatus';
import ServiceForm from './components/ServiceForm';
import logo from './components/images/logo.jpeg';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/'); 
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <nav className="navbar">
        <img src={logo} alt="Bike Hub Logo" className="logo-image" />
        <h1 className="logo">BIKE HUB</h1>
        <p className='side'>Service and Rental Portal</p>
        <div className="center-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/" onClick={() => scrollToSection('explore-section')}>Explore</NavLink>
          <NavLink to="/" onClick={() => scrollToSection('about-section')}>About Us</NavLink>
          <NavLink to="/" onClick={() => scrollToSection('contact-section')}>Contact Us</NavLink>
        </div>
        <div className="right-nav">
          {isLoggedIn ? (
            <>
              <NavLink to="/profile">Profile</NavLink>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">Sign Up</NavLink>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/service-form" element={isLoggedIn ? <ServiceForm closeForm={() => navigate('/')} /> : <Login onLogin={handleLogin} />} />
        <Route path="/bike-options" element={isLoggedIn ? <BikeOptions /> : <Login onLogin={handleLogin} />} />
        <Route path="/profile" element={isLoggedIn ? <Profile onLogout={handleLogout} /> : <Login onLogin={handleLogin} />} />
        <Route path="/service-status" element={isLoggedIn ? <ServiceStatus /> : <Login onLogin={handleLogin} />} />
      </Routes>
    </div>
  );
}

export default App;
