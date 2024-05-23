import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Clubs = () => {
    const [clubs, setClubs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editClub, setEditClub] = useState({
        id: '',
        name: '',
        description: '',
        image: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchClubs();
    }, []);

    const fetchClubs = () => {
        fetch('http://localhost:8081/listClubs')
            .then(response => response.json())
            .then(data => setClubs(data))
            .catch(error => {
                console.error('Failed to load clubs', error);
                alert('Failed to load clubs. Please try again later.');
            });
    };

    const handleSubscribe = (club) => {
        const clubIdAsInt = parseInt(club.id, 10); // Convert id to integer
        fetch('http://localhost:8081/subscribeClub', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: clubIdAsInt,
                name: club.name,
                description: club.description,
                image: club.image
            })
        })
        .then(response => {
            if (response.ok) {
                alert('Subscribed successfully!');
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(() => navigate('/myclubs'))
        .catch(error => {
            console.error('Error subscribing to club:', error);
            alert('Error while subscribing. Please check your network and try again.');
        });
    };

    const handleEdit = (club) => {
        setEditClub(club);
        setShowModal(true);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditClub(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdateClub = () => {
        fetch(`http://localhost:8081/updateClub/${editClub.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: editClub.name,
                description: editClub.description,
                image: editClub.image
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(data => {
                    throw new Error(data.message || 'Failed to update club.');
                });
            }
        })
        .then(data => {
            alert('Club updated successfully!');
            setShowModal(false);
            fetchClubs();
        })
        .catch(error => {
            console.error('Error updating club:', error);
            alert(`Error while updating club: ${error.message}`);
        });
    };

    return (
        <Container style={{ backgroundColor: '#F7F6F3', padding: '20px' }}>
            <h2 className="text-center my-4" style={{ color: '#3C415C' }}>Welcome to our Community!</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
                {clubs.map(club => (
                    <Col key={club.id}>
                        <Card className="h-100" style={{ backgroundColor: '#F1F1F1', border: 'none', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            <Card.Img variant="top" src={club.image} alt={club.name} style={{ objectFit: 'cover', height: '200px', borderRadius: '20px 20px 0 0' }} />
                            <Card.Body className="d-flex flex-column justify-content-between">
                                <div>
                                    <Card.Title style={{ color: '#3C415C', fontSize: '1.5rem', fontWeight: 'bold' }}>{club.name}</Card.Title>
                                    <Card.Text style={{ color: '#707070', fontSize: '1rem' }}>{club.description}</Card.Text>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <Button onClick={() => handleSubscribe(club)} style={{ backgroundColor: '#57B894', borderColor: '#57B894', fontSize: '1rem', fontWeight: 'bold' }}>
                                        Subscribe
                                    </Button>
                                    <Button onClick={() => handleEdit(club)} style={{ backgroundColor: '#FF6F61', borderColor: '#FF6F61', fontSize: '1rem', fontWeight: 'bold' }}>
                                        Edit
                                    </Button>
                                </div>
                            </Card.Body>                            
                        </Card>                        
                    </Col>
                ))}
            </Row>
            <Row className="mt-3">
                    <Col md={12} className="text-center mb-4">
                        <footer>
                            <p>© {new Date().getFullYear()} Honey Reddy Nagireddy, Preethi Reddy Nagireddy. All rights reserved.</p>
                        </footer>
                    </Col>
                </Row>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton style={{ backgroundColor: '#F7F6F3', borderBottom: '1px solid #dee2e6' }}>
                    <Modal.Title style={{ color: '#3C415C' }}>Edit Club</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#FFFFFF', padding: '2rem' }}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ color: '#3C415C' }}>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" name="name" value={editClub.name} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ color: '#3C415C' }}>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter description" name="description" value={editClub.description} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ color: '#3C415C' }}>Image URL</Form.Label>
                            <Form.Control type="text" placeholder="Enter image URL" name="image" value={editClub.image} onChange={handleInputChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#F7F6F3', borderTop: '1px solid #dee2e6' }}>
                    <Button variant="secondary" onClick={() => setShowModal(false)} style={{ color: '#3C415C', fontWeight: 'bold' }}>
                        Close
                    </Button>
                    <Button variant="warning" onClick={handleUpdateClub} style={{ backgroundColor: '#FF6F61', borderColor: '#FF6F61', color: '#FFFFFF', fontWeight: 'bold' }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Clubs;
