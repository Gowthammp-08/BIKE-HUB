import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ServiceForm({ closeForm }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bikeModel: '',
    serviceDate: '',
    issue: '',
    rentBike: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);  

    if (formData.rentBike === 'yes') {
      console.log("Navigating to bike options..."); 
      navigate('/bike-options');
    } else {
      console.log("Not renting a bike, closing form."); 
    }

    closeForm();
  };

  return (
    <form className="service-form" onSubmit={handleSubmit}>
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

      <label>Like to Rent a Bike?</label>
      <div className="radio-options">
        <label>
          <input 
            type="radio" 
            name="rentBike" 
            value="yes" 
            onChange={handleChange} 
          /> 
          Yes
        </label>
        <label>
          <input 
            type="radio" 
            name="rentBike" 
            value="no" 
            onChange={handleChange} 
          /> 
          No
        </label>
      </div>

      <button type="submit">Submit</button>
      <button type="button" onClick={closeForm}>Cancel</button> 
    </form>
  );
}

export default ServiceForm;
