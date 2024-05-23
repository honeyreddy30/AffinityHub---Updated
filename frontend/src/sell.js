import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [newProduct, setNewProduct] = useState({
        id: 0,
        title: '',
        price: '',
        description: '',
        category: '',
        image: '',
        rating: {
            rate: '',
            count: ''
        }
    });
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "rate" || name === "count") {
            setNewProduct(prevProduct => ({
                ...prevProduct,
                rating: {
                    ...prevProduct.rating,
                    [name]: value
                }
            }));
        }else if (name === 'id') {
            setNewProduct(prev => ({ ...prev, [name]: parseInt(value, 10) }));
        } else {
            setNewProduct(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:8081/addProduct', { // Adjust the URL as necessary
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
        .then(response => {
            if (response.ok) {
                alert('Product added successfully!');
                navigate('/products'); // Adjust this to your actual route for displaying products
            } else {
                alert('Failed to add product. Please check the form data.');
            }
        })
        .catch(error => {
            console.error('Error adding new product:', error);
            alert('Error while adding product. Please check your network and try again.');
        });
    };

    return (
        <div style={{
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
                            <h2 className="text-center mb-4">Add New Product</h2>
                            <Form onSubmit={handleFormSubmit}>
                            <Form.Group controlId="formProductID">
    <Form.Label>Product ID</Form.Label>
    <Form.Control type="number" step="1" placeholder="Enter product ID" name="id" value={newProduct.id} onChange={handleInputChange} />
</Form.Group>
                                <Form.Group controlId="formTitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" placeholder="Enter product title" name="title" value={newProduct.title} onChange={handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="formPrice">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="number" placeholder="Enter price" name="price" value={newProduct.price} onChange={handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="formDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text" placeholder="Enter description" name="description" value={newProduct.description} onChange={handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="formCategory">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control type="text" placeholder="Enter category" name="category" value={newProduct.category} onChange={handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="formImage">
                                    <Form.Label>Image URL</Form.Label>
                                    <Form.Control type="text" placeholder="Enter image URL" name="image" value={newProduct.image} onChange={handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="formRate">
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control type="number" step="0.1" placeholder="Enter rating" name="rate" value={newProduct.rating.rate} onChange={handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="formCount">
                                    <Form.Label>Review Count</Form.Label>
                                    <Form.Control type="number" placeholder="Enter review count" name="count" value={newProduct.rating.count} onChange={handleInputChange} />
                                </Form.Group>
                                <div className="text-center">
                                    <Button type="submit" variant="primary">Add Product</Button>
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

export default AddProduct;
