import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Profile.css';

const Profile = ({ onLogout }) => {
    const [userDetails, setUserDetails] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); 

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (!token) {
                navigate('/login'); 
                return;
            }
            try {
                const response = await fetch('http://localhost:5000/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserDetails(data);
                } else if (response.status === 401) {
                    console.error('Token is invalid or expired');
                    handleLogout();
                } else {
                    console.error('Failed to fetch user details:', response.status);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
                handleLogout(); 
            }
        };

        fetchUserDetails();
    }, [navigate, token]);

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        onLogout(); 
        navigate('/login'); 
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>USER PROFILE</h1>
            </div>
            <div className="profile-content">
                {userDetails ? (
                    <div>
                        <p><strong>Full Name:</strong> {userDetails.full_name}</p>
                        <p><strong>Email:</strong> {userDetails.email}</p>
                        {userDetails.dob && (
                            <p><strong>Date of Birth:</strong> {formatDate(userDetails.dob)}</p>
                        )}
                        <p><strong>Phone:</strong> {userDetails.phone}</p>
                        <button className="logout-button" onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <p>Loading user details...</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
