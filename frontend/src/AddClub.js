import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const AddClub = () => {
    const [newClub, setNewClub] = useState({
        id: '',
        name: '',
        description: '',
        image: ''
    });
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewClub(prevClub => ({
            ...prevClub,
            [name]: value
        }));
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:8081/addClub', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newClub)
        })
        .then(response => {
            if (response.ok) {
                alert('Club added successfully!');
                navigate('/clubs'); 
            } else {
                alert('Failed to add club. Please check the form data.');
            }
        })
        .catch(error => {
            console.error('Error adding new club:', error);
            alert('Error while adding club. Please check your network and try again.');
        });
    };

    return (
        <div style={{ 
            //background: '#333',
            background: 'linear-gradient(45deg, #f7f7f7, #eeeeee)',
            backgroundImage: 'repeating-linear-gradient(-45deg, #eeeeee, #eeeeee 10px, #f7f7f7 10px, #f7f7f7 20px)',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <div className="bg-light p-4 rounded shadow">
                            <h2 className="text-center mb-4">Create Your Own Club</h2>
                            <Form onSubmit={handleFormSubmit}>
                                <Form.Group controlId="formClubID">
                                    <Form.Label>Club ID</Form.Label>
                                    <Form.Control type="number" placeholder="Enter club ID" name="id" value={newClub.id} onChange={handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="formClubName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter club name" name="name" value={newClub.name} onChange={handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="formClubDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text" placeholder="Enter club description" name="description" value={newClub.description} onChange={handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="formClubImage">
                                    <Form.Label>Image URL</Form.Label>
                                    <Form.Control type="text" placeholder="Enter image URL" name="image" value={newClub.image} onChange={handleInputChange} />
                                </Form.Group>
                                <div className="text-center">
                                    <Button type="submit" variant="primary">Add Club</Button>
                                </div>
                            </Form>
                        </div>
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
        </div>
    );
};

export default AddClub;
