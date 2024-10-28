import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './css/BikeOptions.css';
import YamahaMT15 from './images/RX.png'; 
import RoyalEnfield from './images/RC.png';  
import activa from './images/activa.jpg';  
import pep from './images/pep.png';  
import HeroHonda from './images/hero.png'; 

const bikes = [  
  { model: 'Yamaha RX-100', rent: '350/day', mileage: '20 km/l', image: YamahaMT15 },  
  { model: 'pep-Scooty', rent: '200/day', mileage: '33 km/l', image: pep }, 
  { model: 'Acitva 5G', rent: '250/day', mileage: '40 km/l', image: activa }, 
  { model: 'Royal Enfield Classic', rent: '500/day', mileage: '35 km/l', image: RoyalEnfield },  
  { model: 'Hero Honda', rent: '300/day', mileage: '48 km/l', image: HeroHonda }  
];  

function BikeOptions() {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state;

  const [selectedBike, setSelectedBike] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSelectBike = (bike) => {
    setSelectedBike(bike.model); 
    console.log("Selected bike:", bike.model);
    setShowModal(true);
  };

  const handleConfirmSelection = () => {
    navigate('/service-form', {
        state: {
            ...formData, 
            selectedBike: selectedBike 
        }
    });
};


  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBike(null);
  };

  return (  
    <div className="bike-options">  
      <h2 className="bike-title">Available Bikes for Rent</h2>  
      <div className="bike-cards">  
        {bikes.map((bike, index) => (  
          <div className="bike-card" key={index}>  
            <img src={bike.image} alt={bike.model} className="bike-image" />  
            <h3 className="bike-model">{bike.model}</h3>  
            <p className="bike-rent">Rent: {bike.rent}</p>  
            <p className="bike-mileage">Mileage: {bike.mileage}</p>  
            <button 
              className="select-button"
              onClick={() => handleSelectBike(bike)}
            >
              Select
            </button>  
          </div>  
        ))}  
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirm Selection</h3>
            <p>Are you sure you want to select the {selectedBike}?</p>
            <div className="action-buttons">
              <button onClick={handleConfirmSelection}>Confirm</button>
              <button onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>  
  );  
}  

export default BikeOptions;
