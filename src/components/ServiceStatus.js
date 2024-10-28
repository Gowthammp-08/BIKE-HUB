import React, { useEffect, useState } from 'react';
import axios from 'axios'; // npm install axios
import './css/ServiceStatus.css'; // Ensure you create this CSS file

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

    // Helper function to format the date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <div>
            <h2 className="heading">Service Status</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {serviceRequests.length > 0 ? (
                <table className="service-status-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Bike Model</th>
                            <th>Service Date</th>
                            <th>Issue</th>
                            <th>Rented Bike</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {serviceRequests.map((request, index) => (
                            <tr key={index}>
                                <td>{request.name}</td>
                                <td>{request.phone}</td>
                                <td>{request.bike_model}</td>
                                <td>{formatDate(request.service_date)}</td> {/* Only date displayed */}
                                <td className={request.issue ? '' : 'red-text'}>
                                    {request.issue || 'Not Specified'}
                                </td>
                                <td className={request.selected_bike ? '' : 'red-text'}>
                                    {request.selected_bike || 'Bike not rented'}
                                </td>
                                <td>
                                    <span className={`status-box ${request.status.toLowerCase()}`}>
                                        {request.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No service requests found.</p>
            )}
        </div>
    );
};

export default ServiceStatus;
