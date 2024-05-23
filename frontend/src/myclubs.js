import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyClubs = () => {
    const [subscribedClubs, setSubscribedClubs] = useState([]);

    useEffect(() => {
        fetchSubscribedClubs();
    }, []);

    const fetchSubscribedClubs = () => {
        fetch('http://localhost:8081/subscribedClubs')
            .then(response => response.json())
            .then(data => setSubscribedClubs(data))
            .catch(error => {
                console.error('Failed to load subscribed clubs', error);
                alert('Failed to load clubs. Please try again later.');
            });
    };

    const handleUnsubscribe = (clubId) => {
        fetch(`http://localhost:8081/unsubscribeClub/${clubId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                setSubscribedClubs(prevClubs => prevClubs.filter(club => club.id !== clubId));
                alert('Unsubscribed successfully!');
            } else {
                alert('Failed to unsubscribe. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error unsubscribing from club:', error);
            alert('Error while unsubscribing. Please check your network and try again.');
        });
    };

    return (
        
        <Container style={{ backgroundColor: '#f5f5f5', padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>My Subscribed Clubs</h2>
            <Row>
                {subscribedClubs.map(club => (
                    <Col md={4} key={club.id}>
                        <Card className="mb-3" style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                            <Card.Img variant="top" src={club.image} alt={club.name} />
                            <Card.Body style={{ backgroundColor: '#fff' }}>
                                <Card.Title style={{ color: '#333' }}>{club.name}</Card.Title>
                                <Card.Text style={{ color: '#555' }}>{club.description}</Card.Text>
                                <Button variant="danger" onClick={() => handleUnsubscribe(club.id)}>Unsubscribe</Button>
                            </Card.Body>
                            
                        </Card>
                        
                    </Col>
                    
                ))}
                <Row className="mt-3">
                    <Col md={12} className="text-center mb-4">
                        <footer>
                            <p>© {new Date().getFullYear()} Honey Reddy Nagireddy, Preethi Reddy Nagireddy. All rights reserved.</p>
                        </footer>
                    </Col>
                </Row>
            </Row>
        </Container>
    );
};

export default MyClubs;

