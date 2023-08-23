import React from 'react';
import { Card, Button } from 'react-bootstrap';
import '../css/cartproduct.css'; // Import the CartProduct CSS file

const CartProduct = ({ productcart }) => {
  return (
    <div className="cart-product-card">
      <Card key={productcart.product_id}>
        <Card.Img className="card-img-top" variant="top" src={productcart.image_url} />
        <Card.Body>
          <Card.Title>{productcart.product_name}</Card.Title>
          <Card.Text className="description">{productcart.description.slice(0, 50)}...</Card.Text>
          <div className="d-flex justify-content-between align-items-center" id='cart-card-buttons'>
            <div className="price">${productcart.price}</div>
            <Button variant="danger" size='sm'>
              Remove
            </Button>
            <Button variant="primary" size='sm'>
              Proceed to Pay
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CartProduct;
