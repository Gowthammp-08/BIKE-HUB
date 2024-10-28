import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/SignUp.css';
import SignUpImage from './images/signpic.webp';

function SignUp() {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName, email, dob, phone, password }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log("added")
                navigate('/login');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error during sign up:', error);
        }
    };

    return (
        <div className="signUp-container">
            <div className="signUp-content">
                <img src={SignUpImage} alt="Sign Up illustration" className="signup-image" />
                <div className="form-wrapper">
                    <h1>Sign Up</h1>
                    {error && <div className="error-message">{error}</div>}
                    <form className="signUp-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="date"
                            placeholder="Date of Birth"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            required
                        />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
