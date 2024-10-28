import React, { useEffect, useState } from 'react';
import axios from 'axios';//npm install axios

const ServiceStatus = () => {
    const [serviceRequests, setServiceRequests] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchServiceStatus = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found. Please log in.');
                }
                const response = await axios.get('http://localhost:5000/service-status', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setServiceRequests(response.data);
            } catch (error) {
                console.error('Error fetching service status:', error);
                setErrorMessage('Failed to fetch service status. Please try again later.');
            }
        };

        fetchServiceStatus();
    }, []);

    return (
        <div>
            <h2>Service Status</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {serviceRequests.length > 0 ? (
                <ul>
                    {serviceRequests.map((request, index) => (
                        <li key={index}>
                            <p>Name: {request.name}</p>
                            <p>Phone: {request.phone}</p>
                            <p>Bike Model: {request.bike_model}</p>
                            <p>Service Date: {request.service_date}</p>
                            <p>Issue: {request.issue}</p>
                            <p>Status: {request.status}</p>
                            <hr />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No service requests found.</p>
            )}
        </div>
    );
};


export default ServiceStatus;
