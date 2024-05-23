import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchId, setSearchId] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch('http://localhost:8081/listProducts')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => {
        console.error('Failed to load products:', error);
        alert('Failed to load products. Please try again later.');
      });
  };

  const handleAddToCart = (product) => {
    const rate = product.rating?.rate || 0;
    const count = product.rating?.count || 0;

    fetch('http://localhost:8081/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: product.id,
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            image: product.image,
            rating: { rate, count }
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add to cart');
        }
        return response.json();
    })
    .then(data => {
        alert('Product added to cart successfully!');
    })
    .catch(error => {
        console.error('Error adding product to cart:', error);
        alert('Failed to add product to cart. Please try again.');
    });
  };

  const handleSearchById = () => {
    fetch(`http://localhost:8081/listProducts/${searchId}`)
      .then(response => response.json())
      .then(data => {
        setProducts([data]);
      })
      .catch(error => {
        console.error('Failed to fetch product by ID:', error);
        alert('Failed to find the product. Please check the ID and try again.');
      });
  };

  return (
    <Container style={{ backgroundColor: '#E8F8F5', padding: '20px', borderRadius: '20px' }}>
      <h2 className="text-center my-4" style={{ color: '#2C3E50', borderBottom: '2px solid #2C3E50' }}>Welcome to Our Store</h2>
      <div className="d-flex justify-content-center mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter product ID to search"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          style={{ marginRight: '10px', borderColor: '#2C3E50', color: '#2C3E50', fontWeight: 'bold' }}
        />
        <Button onClick={handleSearchById} variant="primary" style={{ backgroundColor: '#2980B9', borderColor: '#2980B9', fontWeight: 'bold' }}>Search by ID</Button>
        <Button onClick={fetchProducts} variant="success" className="ms-2" style={{ backgroundColor: '#27AE60', borderColor: '#27AE60', fontWeight: 'bold' }}>Fetch All Products</Button>
      </div>
      <Row xs={1} md={2} lg={3} className="g-4 my-3">
        {products.map((product) => (
          <Col key={product.id}>
            <Card className="shadow-sm h-100 d-flex flex-column" style={{ borderColor: '#2C3E50', borderRadius: '20px' }}>
              <Card.Header className="bg-dark text-white" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '20px' }}>{product.category}</Card.Header>
              <Card.Img variant="top" src={product.image} alt={product.title} className="img-fluid" style={{ maxHeight: 'auto', objectFit: 'auto' }} />
              <Card.Body className="d-flex flex-column justify-content-between" style={{ color: '#2C3E50' }}>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text><small className="text-muted">Product ID: {product.id}</small></Card.Text>
                <Card.Text><small className="text-muted">Price: {product.price}</small></Card.Text>
                <Button onClick={() => handleAddToCart(product)} variant="primary" style={{ backgroundColor: '#3498DB', borderColor: '#3498DB', fontWeight: 'bold' }}>Add to Cart</Button>
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
    </Container>
  );
};

export default ManageProducts;
