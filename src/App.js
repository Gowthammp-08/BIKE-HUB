import React, { useState } from 'react';  
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  
import Home from './components/Home';  
import SignUp from './components/Signup';  
import Login from './components/Login';  
import BikeOptions from './components/BikeOptions';  
import logo from './components/images/logo.jpeg';
import './App.css';  

function App() {  
  const [isLoggedIn, setIsLoggedIn] = useState(false);  

  const handleLogin = (status) => {  
    setIsLoggedIn(status);  
  };  

  const handleLogout = () => {  
    setIsLoggedIn(false);  
  };  

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (  
    <Router>  
      <div>  
        <nav className="navbar">
          <img src={logo} alt="Bike Hub Logo" className="logo-image" />  
          <h1 className="logo">BIKE HUB</h1>
          <p className='side'>Service and Rental Portal</p>
          <div className="center-nav">  
            <Link to="/">Home</Link>   
            <Link to="/" onClick={() => scrollToSection('explore-section')}>
              Explore
            </Link>
            <Link to="/" onClick={() => scrollToSection('about-section')}>
              About Us
            </Link> 
            <Link to="/" onClick={() => scrollToSection('contact-section')}>
              Contact Us
            </Link>
          </div>  
          <div className="right-nav">  
            {isLoggedIn ? (  
              <div className="profile-dropdown">  
                <span>Profile</span>  
                <div className="dropdown-content">  
                  <Link to="/settings">Settings</Link>  
                  <Link to="/" onClick={handleLogout}>Logout</Link>  
                </div>  
              </div>  
            ) : (  
              <>  
                <Link to="/login">Login</Link>  
                <Link to="/signup">Sign Up</Link>  
              </>  
            )}  
          </div>  
        </nav>  

        <Routes>  
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />  
          <Route path="/signup" element={<SignUp />} />  
          <Route path="/login" element={<Login onLogin={handleLogin} />} />  
          <Route path="/bike-options" element={<BikeOptions />} />  
        </Routes>  
      </div>  
    </Router>  
  );  
}  

export default App;
