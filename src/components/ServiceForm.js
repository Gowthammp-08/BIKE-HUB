import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './css/ServiceForm.css';

function ServiceForm({ closeForm }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        bikeModel: '',
        serviceDate: '',
        issue: '',
        selectedBike: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const { state } = location;
        if (state) {
            setFormData((prevData) => ({
                ...prevData,
                ...state, // Combine existing data with new state
            }));
        }
    }, [location]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

    const handleRentBike = () => {
        navigate('/bike-options', { state: formData }); // Pass existing formData to BikeOptions
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setIsLoading(true);

        if (!validatePhone(formData.phone)) {
            setErrorMessage('Please enter a valid 10-digit phone number.');
            setIsLoading(false);
            return;
        }

        if (!formData.bikeModel) {
            setErrorMessage('Please select a bike model.');
            setIsLoading(false);
            return;
        }

        try {
            const { name, phone, bikeModel, serviceDate, issue, selectedBike } = formData;
            const dataToSubmit = {
                name,
                phone,
                bikeModel,
                serviceDate,
                issue,
                selectedBike: selectedBike || null,
            };

            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/service-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(dataToSubmit),
            });

            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    setErrorMessage('Session expired. Please log in again.');
                    localStorage.removeItem('token');
                    navigate('/login');
                } else {
                    const errorText = await response.text();
                    throw new Error(errorText || 'Network response was not ok');
                }
            } else {
                const data = await response.json();
                console.log(data.message);
                setErrorMessage('Service request submitted successfully!');

                setFormData({
                    name: '',
                    phone: '',
                    bikeModel: '',
                    serviceDate: '',
                    issue: '',
                    selectedBike: '',
                });

                navigate('/');
                closeForm();
            }
        } catch (error) {
            console.error('Error submitting service request:', error);
            setErrorMessage('Failed to submit the request. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="service-form" onSubmit={handleSubmit}>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />

            <label>Phone:</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />

            <label>Bike Model:</label>
            <select name="bikeModel" value={formData.bikeModel} onChange={handleChange} required>
                <option value="">Select Bike Model</option>
                <option value="Yamaha MT-15">Yamaha MT-15</option>
                <option value="Royal Enfield Classic 350">Royal Enfield Classic 350</option>
                <option value="Honda Hornet 2.0">Honda Hornet 2.0</option>
            </select>

            <label>Service Date:</label>
            <input type="date" name="serviceDate" value={formData.serviceDate} onChange={handleChange} required />

            <label>Issue on Bike (optional):</label>
            <input type="text" name="issue" value={formData.issue} onChange={handleChange} placeholder="Describe issue (optional)" />

            <p>(Optional)</p>
            <button type="button" className="rent-bike-button" onClick={handleRentBike}>
                Rent Bike 
            </button>

            <label>Selected Bike for Rent:</label>
            <input type="text" value={formData.selectedBike || ''} readOnly placeholder="Not Selected" />
            
            

            <div className="action-buttons">
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit'}
                </button>
                <button type="button" onClick={closeForm}>Cancel</button>
            </div>
        </form>
    );
}

export default ServiceForm;
