import React, { useState } from 'react';
import './css/Profile.css';

function Profile() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', userInfo);
    alert('Profile updated successfully!');
  };

  return (
    <div className="profile-container">
      <h2>Profile Changes</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={userInfo.name}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={userInfo.email}
          onChange={handleChange}
          required
        />

        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={userInfo.phone}
          onChange={handleChange}
          required
        />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default Profile;
