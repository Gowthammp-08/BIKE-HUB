import React, { useState } from 'react';  
import { Link, useNavigate } from 'react-router-dom';  
import './css/Login.css';
import LoginImage from './images/loginpic.webp';

function Login({ onLogin }) {  
    const [email, setEmail] = useState('');  
    const [password, setPassword] = useState('');  
    const navigate = useNavigate();  

    const handleSubmit = (e) => {  
        e.preventDefault(); 
        if (email === "gow@gmail.com" && password === "123") {  //change the required mail id and password here......
            onLogin(true);  
            navigate("/");  
        } else {  
            alert('Invalid login credentials');  
        }  
    };  

    return (  
        <div className="login-container">  
            <div className="login-content">  
                <img src={LoginImage} alt="Login illustration" className="login-image" />  
                <div className="form-wrapper">  
                    <h1>Login</h1>  
                    <form className="login-form" onSubmit={handleSubmit}>  
                        <input   
                            type="email"   
                            placeholder="Email"   
                            value={email}   
                            onChange={(e) => setEmail(e.target.value)}   
                            required   
                        />  
                        <input   
                            type="password"   
                            placeholder="Password"   
                            value={password}   
                            onChange={(e) => setPassword(e.target.value)}   
                            required   
                        />  
                        <button type="submit">Login</button>  
                    </form>  
                    <p className="signup-prompt">  
                        New user? <Link to="/signup">Sign up here</Link>  
                    </p>  
                </div>  
            </div>  
        </div>  
    );  
}  

export default Login;