/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Modal, Form } from 'react-bootstrap';
import '../css/products.css';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const ProductsComponent = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async () => {
    try {
      if (!stripe || !elements) {
        console.error('Stripe.js has not loaded yet.');
        return;
      }
      const cardElement = elements.getElement(CardElement);
      const response = await fetch('http://localhost:5000/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_STRIPE_SECRET_KEY}`
        },
        body: JSON.stringify({
          amount: selectedProduct.price * 100,
          currency: 'inr',
          description: selectedProduct.product_name,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const { error } = await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
            type: 'card',
            card: cardElement,
          }
        })

        if (error) {
          console.error('Payment failed:', error);
        } else {
          console.log('Payment successful');
          setShowModal(false);
          setSelectedProduct(null);
        }
      } else {
        console.error('Error creating PaymentIntent');
      }
    } catch (error) {
      console.error('Error handling payment:', error);
    }
  };

  return (

    <div className="product-container">
      <Elements stripe={stripePromise}>
        <Row xs={1} sm={2} md={4} className="g-4">
          {products.map((product) => (
            <Col key={product.product_id}>
              <Card className="product-card">
                <Card.Img variant="top" src={product.image_url} />
                <Card.Body>
                  <Card.Title>{product.product_name}</Card.Title>
                  <Card.Text>{product.description.slice(0, 50)}...</Card.Text>
                  <div className="d-flex justify-content-between align-items-center" id='card-buttons'>
                    <div className="price">${product.price}</div>
                    <Button variant="primary" onClick={() => handleOpenModal(product)} size='sm'>
                      Proceed to Payment
                    </Button>
                    <Link to={`/sweets/${product.product_id}`} className="btn btn-primary">
                      Open Sweet
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Elements>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Payment for {selectedProduct?.product_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Amount</Form.Label>
              <Form.Control type="text" value={`$${selectedProduct?.price}`} readOnly />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" value={selectedProduct?.description} readOnly />
            </Form.Group>
            <Form.Group>
              <Form.Label>Card Details</Form.Label>
              <CardElement options={{ style: { base: { fontSize: '16px' } } }}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePayment}>
            Pay
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductsComponent;
