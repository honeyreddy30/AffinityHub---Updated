import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import logo from './logo512.png'; 
import { useNavigate } from 'react-router-dom'; 

const Home = () => {
  const navigate = useNavigate();  

  const handleExploreGroups = () => {
    navigate('/clubs');  
  };
  
  const handleVisitMarketplace = () => {
    navigate('/products');  
  };

  return (
    <Container fluid className="px-0">
      <Row className="bg-dark text-white text-center py-5 mb-3">
        <Col>
          <img src={logo} alt="AffinityHub Logo" style={{ width: '10rem', height: '10rem' }} />
          <h1>Welcome to AffinityHub!</h1>
          <p>Your gateway to exploring and sharing passions with a vibrant community.</p>
        </Col>
      </Row>
      <Container className="mt-3">
        <Row className="mb-3">
          <Col md={6}>
            <Card className="text-center bg-primary text-white">
              <Card.Body>
                <Card.Title>Create and Join Communities</Card.Title>
                <Card.Text>
                  Explore a diverse range of hobby groups and connect with people who share your interests.
                </Card.Text>
                <Button variant="light" onClick={handleExploreGroups}>Explore Groups</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="text-center bg-success text-white">
              <Card.Body>
                <Card.Title>Marketplace</Card.Title>
                <Card.Text>
                  Buy items related to your hobbies in a secure and engaging environment.
                </Card.Text>
                <Button variant="light" onClick={handleVisitMarketplace}>Visit Marketplace</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Card className="text-center bg-info text-white">
              <Card.Body>
                <Card.Title>About AffinityHub</Card.Title>
                <Card.Text>
                  At AffinityHub, we strive to connect people through their passions. Our platform offers a unique space to meet others who share your interests,
                   engage in meaningful conversations, and grow your network of friends and collaborators worldwide.
                </Card.Text>
              </Card.Body>
            </Card>
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
    </Container>
  );
};

export default Home;
