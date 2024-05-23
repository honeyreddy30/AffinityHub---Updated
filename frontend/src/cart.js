import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Form, Row, Col, Card } from 'react-bootstrap';

const Shop = () => {
  const [cart, setCart] = useState([]);
  const [userDetails, setUserDetails] = useState({
    fullName: '',
    email: '',
    cardNumber: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleResetAndBrowse = () => {
    navigate('/products');
  };

  const handleResetCart = () => {
    setCart([]);
  };

  const fetchCartItems = async () => {
    try {
      const response = await fetch('http://localhost:8081/cart');
      if (!response.ok) throw new Error('Failed to fetch cart items');
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (item) => {
    try {
      const response = await fetch('http://localhost:8081/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      if (!response.ok) throw new Error('Failed to add item to cart');
      fetchCartItems(); 
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const removeFromCart = async (item) => {
    try {
      const response = await fetch(`http://localhost:8081/cart/${item.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to remove item from cart');
      fetchCartItems();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const formatPrice = (price) => {
    const numPrice = Number(price);
    return isNaN(numPrice) ? 'N/A' : numPrice.toFixed(2);
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + (Number(item.price) || 0), 0).toFixed(2);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  if (showConfirmation) {
    return (
      <Container
        style={{
          backgroundColor: '#f0f3f8',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1 style={{ textAlign: 'center', color: '#333' }}>Order Confirmation</h1>
        {cart.map((item) => (
          <Card
            key={item.id}
            style={{
              marginBottom: '10px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              backgroundColor: '#fff',
            }}
          >
            <Card.Img variant="top" src={item.image} style={{ maxWidth: '100px' }} />
            <Card.Body>
              <Card.Title style={{ color: '#333' }}>{item.title}</Card.Title>
              <Card.Text>${formatPrice(item.price)}</Card.Text>
            </Card.Body>
          </Card>
        ))}
        <h4 style={{ color: '#333' }}>Total: ${calculateTotal()}</h4>
        <div>
          <p style={{ color: '#555', marginBottom: '10px' }}>
            <strong>User Info:</strong>
          </p>
          <p style={{ color: '#555' }}>Name: {userDetails.fullName}</p>
          <p style={{ color: '#555' }}>Email: {userDetails.email}</p>
          <p style={{ color: '#555' }}>
            Card Number: {'*'.repeat(12) + userDetails.cardNumber.slice(12)}
          </p>
          <p style={{ color: '#555' }}>
            Address: {`${userDetails.address}, ${userDetails.city}, ${userDetails.state}, ${userDetails.zip}`}
          </p>
        </div>
        <Button
          variant="primary"
          onClick={handleResetAndBrowse}
          style={{ backgroundColor: '#ff7f50', border: 'none' }}
        >
          Continue Shopping
        </Button>
        <Button
          variant="secondary"
          onClick={handleResetCart}
          style={{ marginLeft: '10px', backgroundColor: '#7ec8e3', border: 'none' }}
        >
          Reset Cart
        </Button>
        <Button
          variant="success"
          onClick={() => {}}
          style={{ marginLeft: '10px', backgroundColor: '#a3d8a5', border: 'none' }}
        >
          Confirm and Place Order
        </Button>
      </Container>
    );
  }

  return (
    <Container
      style={{
        backgroundColor: '#f0f3f8',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h1 style={{ textAlign: 'center', color: '#333' }}>Checkout</h1>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th style={{ color: '#333' }}>Item</th>
            <th style={{ color: '#333' }}>Quantity</th>
            <th style={{ color: '#333' }}>Price</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td style={{ color: '#555' }}>{item.title}</td>
              <td>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => removeFromCart(item)}
                >
                  -
                </Button>{' '}
                {item.quantity}{' '}
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => addToCart(item)}
                >
                  +
                </Button>
              </td>
              <td style={{ color: '#555' }}>${formatPrice(item.price)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2" style={{ color: '#333' }}>
              Total
            </td>
            <td style={{ color: '#555' }}>${calculateTotal()}</td>
          </tr>
        </tfoot>
      </Table>
      <h4 style={{ color: '#333' }}>Payment Information</h4>
      <Form onSubmit={handlePlaceOrder}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formFullName">
              <Form.Label style={{ color: '#333' }}>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, fullName: e.target.value })
                }
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formEmail">
              <Form.Label style={{ color: '#333' }}>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, email: e.target.value })
                }
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="formCard">
              <Form.Label style={{ color: '#333' }}>Card Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="XXXX-XXXX-XXXX-XXXX"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, cardNumber: e.target.value })
                }
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formAddress">
              <Form.Label style={{ color: '#333' }}>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="1234 Main St"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, address: e.target.value })
                }
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formCity">
              <Form.Label style={{ color: '#333' }}>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, city: e.target.value })
                }
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group controlId="formState">
              <Form.Label style={{ color: '#333' }}>State</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, state: e.target.value })
                }
                required
              >
                <option value="">Select State</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formZip">
              <Form.Label style={{ color: '#333' }}>Zip</Form.Label>
              <Form.Control
                type="text"
                placeholder="Zip"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, zip: e.target.value })
                }
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button
          variant="primary"
          type="submit"
          style={{ backgroundColor: '#ff7f50', border: 'none' }}
        >
          Place Order
        </Button>
      </Form>
      <Row className="mt-3">
        <Col md={12} className="text-center mb-4">
          <footer>
            <p style={{ color: '#555' }}>
              © {new Date().getFullYear()} Honey Reddy Nagireddy, Preethi Reddy
              Nagireddy. All rights reserved.
            </p>
          </footer>
        </Col>
      </Row>
    </Container>
  );
};

export default Shop;