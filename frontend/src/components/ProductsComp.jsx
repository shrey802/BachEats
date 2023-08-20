// ProductsComponent.js

import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import '../css/products.css';
import { Link } from 'react-router-dom';
const ProductsComponent = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/getallSweets');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error('Error fetching products');
      }
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

  return (
    <div className="product-container">
      <Row xs={1} sm={2} md={4} className="g-4">
        {products.map((product) => (
          <Col key={product.product_id}>
            <Card className="product-card">
              <Card.Img variant="top" src={product.image_url} />
              <Card.Body>
                <Card.Title>{product.product_name}</Card.Title>
                <Card.Text>{product.description.slice(0, 50)}...</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="price">${product.price}</div>

                  <Button variant="primary">Add to Cart</Button>
                  <Link to={`/sweets/${product.product_id}`} className="btn btn-primary">
                    Open Sweet
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductsComponent;
