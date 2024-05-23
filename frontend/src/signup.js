import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';

const Signup = ({ onLogin }) => {
  const navigate = useNavigate();

  const [signupFormData, setSignupFormData] = useState({
    name: '',
    username: '',
    age: '',
    bio: '',
    interests: '',
    image: '',
    password: ''
  });
  const [signupError, setSignupError] = useState('');

  const [loginFormData, setLoginFormData] = useState({
    username: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupFormData({ ...signupFormData, [name]: value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8081/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupFormData)
      });

      if (response.ok) {
        console.log('User created successfully');
        onLogin();
        navigate('/clubs');
      } else if (response.status === 409) {
        throw new Error('Username already exists');
      } else {
        throw new Error('Failed to sign up');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setSignupError(error.message);
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8081/listUsers/${loginFormData.username}`);
      const user = await response.json();
      if (user && user.password === loginFormData.password) {
        console.log('Login successful');
        onLogin();
        navigate(`/home`);
      } else {
        console.error('Invalid username or password');
        setLoginError('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('An error occurred. Please try again.');
    }
  };

  return (
    <Container fluid className="mt-3" style={{ backgroundColor: '#aed9e0', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
      
      <Row>
        <Col md={6}>
          <h2 className="mb-4" style={{ color: '#2c3e50' }}>Signup</h2>
          {signupError && <Alert variant="danger">{signupError}</Alert>}
          <Form onSubmit={handleSignupSubmit}>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#2c3e50' }}>Name:</Form.Label>
              <Form.Control type="text" name="name" value={signupFormData.name} onChange={handleSignupChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#2c3e50' }}>Username:</Form.Label>
              <Form.Control type="text" name="username" value={signupFormData.username} onChange={handleSignupChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#2c3e50' }}>Age:</Form.Label>
              <Form.Control type="text" name="age" value={signupFormData.age} onChange={handleSignupChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#2c3e50' }}>Bio:</Form.Label>
              <Form.Control type="text" name="bio" value={signupFormData.bio} onChange={handleSignupChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#2c3e50' }}>Interests:</Form.Label>
              <Form.Control type="text" name="interests" value={signupFormData.interests} onChange={handleSignupChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#2c3e50' }}>Image:</Form.Label>
              <Form.Control type="text" name="image" value={signupFormData.image} onChange={handleSignupChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#2c3e50' }}>Password:</Form.Label>
              <Form.Control type="password" name="password" value={signupFormData.password} onChange={handleSignupChange} required />
            </Form.Group>
            <Button type="submit" variant="primary">Signup</Button>
          </Form>
        </Col>
        <Col md={6}>
          <h2 className="mb-4" style={{ color: '#2c3e50' }}>Login</h2>
          {loginError && <Alert variant="danger">{loginError}</Alert>}
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#2c3e50' }}>Username:</Form.Label>
              <Form.Control type="text" name="username" value={loginFormData.username} onChange={handleLoginChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#2c3e50' }}>Password:</Form.Label>
              <Form.Control type="password" name="password" value={loginFormData.password} onChange={handleLoginChange} required />
            </Form.Group>
            <Button type="submit" variant="primary">Login</Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-3">
                    <Col md={12} className="text-center mb-4">
                        <footer>
                            <p>© {new Date().getFullYear()} Honey Reddy Nagireddy, Preethi Reddy Nagireddy. All rights reserved.</p>
                        </footer>
                    </Col>
                </Row>
    </Container>
  );
};

export default Signup;





