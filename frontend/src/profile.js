import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Row, Col } from 'react-bootstrap';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    bio: '',
    interests: '',
    image: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8081/listUsers/${username}`);
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
        setFormData(data);
      } else {
        setError('Profile not found. Please check the username and try again.');
        setProfileData(null);
      }
    } catch (error) {
      setError('An error occurred while fetching the profile. Please try again.');
      console.error('Search error:', error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8081/updateUser/${username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Profile updated successfully');
        setProfileData(formData);
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      setError('Failed to update profile. Please try again.');
      console.error('Profile update error:', error);
    }
  };

  const handleDeleteProfile = async () => {
    if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      try {
        const response = await fetch(`http://localhost:8081/deleteUser/${username}`, { method: 'DELETE' });
        if (response.ok) {
          alert('Profile deleted successfully');
          navigate('/home');
        } else {
          throw new Error('Failed to delete profile');
        }
      } catch (error) {
        setError('Failed to delete profile. Please try again.');
        console.error('Delete profile error:', error);
      }
    }
  };

  return (
    <div className="container" style={{ backgroundColor: '#f0f3f8', padding: '20px', borderRadius: '10px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }}>
      <h2 className="mb-4" style={{ textAlign: 'center', color: '#333' }}>Profile Management</h2>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#ff7f50', border: 'none' }}>Search</button>
      </form>
      {error && <p className="text-danger">{error}</p>}
      {profileData && (
        <div>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label className="form-label" style={{ color: '#333' }}>Name:</label>
              <input type="text" className="form-control" name="name" value={formData.name} onChange={handleFormChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ color: '#333' }}>Age:</label>
              <input type="text" className="form-control" name="age" value={formData.age} onChange={handleFormChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ color: '#333' }}>Bio:</label>
              <input type="text" className="form-control" name="bio" value={formData.bio} onChange={handleFormChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ color: '#333' }}>Interests:</label>
              <input type="text" className="form-control" name="interests" value={formData.interests} onChange={handleFormChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ color: '#333' }}>Image:</label>
              <input type="text" className="form-control" name="image" value={formData.image} onChange={handleFormChange} required />
            </div>
            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#ff7f50', border: 'none' }}>Update Profile</button>
            <button type="button" onClick={handleDeleteProfile} className="btn btn-danger ms-2" style={{ backgroundColor: '#ff4d4f', border: 'none' }}>Delete Profile</button>
          </form>
          <Row className="mt-3">
            <Col md={12} className="text-center mb-4">
              <footer>
                <p style={{ color: '#555' }}>© {new Date().getFullYear()} Honey Reddy Nagireddy, Preethi Reddy Nagireddy. All rights reserved.</p>
              </footer>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default Profile;

