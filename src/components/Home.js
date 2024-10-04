import React, { useState, useEffect } from 'react';  
import ServiceForm from './ServiceForm';  
import './css/Home.css';  

const images = [ 
    require('./images/slide2.jpg'),  
    require('./images/slide3.jpg'),  
    require('./images/slide4.jpg'),  
    require('./images/slide5.jpg'),  
    require('./images/slide6.jpg')  
];  

const availableServices = [  
    { name: 'Water Wash', description: 'Thorough cleaning of your bike to keep it looking brand new.', image: require('./images/waterwash.png')  },  
    { name: 'Full Bike Service', description: 'Comprehensive servicing to ensure your bike runs smoothly.', image: require('./images/fullservice.png')  },  
    { name: 'Oil Change', description: 'Changing engine oil for optimal performance and longevity.', image: require('./images/oil.png')  },  
    { name: 'Brake Adjustment', description: 'Adjusting brakes for better safety and response.', image: require('./images/break.png')  },  
    { name: 'Chain Lubrication', description: 'Keeping your chain lubricated for a smooth ride.', image: require('./images/slide1.jpg')  },  
];  

function Home({ isLoggedIn }) {  
    const [showForm, setShowForm] = useState(false);  
    const [showError, setShowError] = useState(false);  
    const [currentImageIndex, setCurrentImageIndex] = useState(0);  

    const handleRegisterClick = () => {  
        if (!isLoggedIn) {  
            setShowError(true);  
        } else {  
            setShowForm(true);  
            setShowError(false);  
        }  
    };  

    const closeErrorPopup = () => {  
        setShowError(false);  
    };  

    const closeForm = () => {  
        setShowForm(false);  
    };  

    const nextSlide = () => {  
        setCurrentImageIndex((prevIndex) =>  
            prevIndex === images.length - 1 ? 0 : prevIndex + 1  
        );  
    };  

    const prevSlide = () => {  
        setCurrentImageIndex((prevIndex) =>  
            prevIndex === 0 ? images.length - 1 : prevIndex - 1  
        );  
    };  

    useEffect(() => {  
        const interval = setInterval(() => {  
            nextSlide();  
        }, 4000);  

        return () => clearInterval(interval);  
    }, []);  

    return (  
        <div className="home">  
            <h1>Welcome to Bike Service Portal</h1>  

            <div className="slider">  
                <button onClick={prevSlide} className="slider-button left">❮</button>  
                <img  
                    src={images[currentImageIndex]}  
                    alt={`Slide ${currentImageIndex + 1}`}  
                    className="slider-image"  
                />  
                <button onClick={nextSlide} className="slider-button right">❯</button>  
            </div>  

            <button onClick={handleRegisterClick} className="register-btn">  
                Register for Service  
            </button>  

            <div id="explore-section" className="explore-us">  
                <h2>Available Services</h2>  
                <div className="services-cards">  
                    {availableServices.map((service, index) => (  
                        <div className="service-card" key={index}>  
                            <img src={service.image} alt={service.name} className="service-image" />
                            <h3 className="service-name">{service.name}</h3>  
                            <p className="service-description">{service.description}</p>  
                        </div>  
                    ))}  
                </div>  
            </div>

            <div id="about-section" className="about-us">  
                <h2>About Us</h2>  
                <h3>Welcome to BIKE HUB!</h3>  
                <p>At BIKE HUB, we believe that bike servicing should be a seamless experience for everyone. Our mission is to provide a hassle-free solution for bicycle owners who require their bikes for servicing. We understand how inconvenient it can be to be without your bike during service days, which is why we've developed a unique platform dedicated to easing this process.</p>
                <p>Our website offers an innovative rental service that allows you to rent a bike while yours is being serviced. No more searching for a separate rental agency or worrying about your transportation needs during repair time. With BIKE HUB, you can conveniently manage both your bike service and rental requirements all in one place.</p>
                <p>Our team is committed to ensuring that you have access to reliable rental bikes, allowing you to stay mobile without interruption. Whether you need a bike for your daily commute, a weekend adventure, or just to run errands, we've got you covered.</p>
                <p>Thank you for choosing BIKE HUB. We look forward to helping you keep riding smoothly, even when your bike is in the shop!</p>
            </div>  

            <div id="contact-section" className="contact-us">  
                <h2>Contact Us</h2>  
                <p>If you have any questions or need assistance, feel free to reach out to us:</p>  
                <ul>  
                    <li>Email: <a href="mailto:ask@bikehub.com">ask@bikehub.com</a></li>  
                    <li>Phone: <a href="tel:9344065116">9344065116</a> / <a href="tel:9150604051">9150604051</a></li>  
                    <li>Address: BANNARI AMMAN INSTITUTE OF TECHNOLOGY, SATHY, ERODE</li>  
                </ul>  
                <p>We're here to help you with all your servicing needs!</p>  

                <div className="social-media">  
                    <h3>Follow Us</h3>  
                    <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">Instagram</a>  
                    <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">LinkedIn</a>  
                    <a href="https://www.facebook.com/yourprofile" target="_blank" rel="noopener noreferrer">Facebook</a>  
                </div>  
            </div>  

            {showForm && (  
                <div className="form-popup">  
                    <ServiceForm closeForm={closeForm} />  
                </div>  
            )}  

            {showError && (  
                <div className="error-popup">  
                    <p>You need to log in to register for a service.</p>  
                    <button onClick={closeErrorPopup}>Close</button>  
                </div>  
            )}  
        </div>  
    );  
}  

export default Home;
