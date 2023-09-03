/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import '../css/cartproduct.css'; // Import the CartProduct CSS file
import { useNavigate } from 'react-router-dom'
const CartProduct = ({ productcart, onRemove, onUpdatePriceAndQuantity }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(productcart.quantity);
  const navigate = useNavigate();
  // handle all the cart products this is rendered in CartComponent to render each product and pass the values as props
  function handleRemove() {
    onRemove(productcart.cart_id)
  }

  const handlePayButtonClick = () => {
    // Store the selected quantity in localStorage
    localStorage.setItem('selectedQuantity', selectedQuantity);
    
    // Navigate to the payment page
    navigate(`/payment/${formattedPrice}`)
    localStorage.setItem('prodID', productcart.product_id);
  };

  const calculatedPrice = productcart.price * (selectedQuantity / 250);
  const formattedPrice = calculatedPrice.toFixed(2);
  return (
    <div className="cart-product-card">
      <Card key={productcart.product_id}>
        <Card.Img className="card-img-top" variant="top" src={productcart.image_url} />
        <Card.Body>
          <Card.Title>{productcart.product_name}</Card.Title>

          <Card.Text className="description">{productcart.description.slice(0, 50)}...</Card.Text>
          <Card.Text className='price'>INR {formattedPrice}</Card.Text>
          <div className="d-flex justify-content-between align-items-center" id='cart-card-buttons'>
            <Form.Control
              as="select"
              value={productcart.quantity}
              onChange={(e) => {
                const newSelectedQuantity = parseInt(e.target.value);
                const newCalculatedPrice = productcart.price * (newSelectedQuantity / 250);
                const newFormattedPrice = newCalculatedPrice.toFixed(2);

                

                setSelectedQuantity(newSelectedQuantity);

                onUpdatePriceAndQuantity(productcart.cart_id, newFormattedPrice, newSelectedQuantity);

              
              }}
            >
              <option value={250}>250g</option>
              <option value={500}>500g</option>
              <option value={750}>750g</option>
              <option value={1000}>1000g</option>
              <option value={1250}>1250g</option>
              <option value={1500}>1500g</option>
              <option value={1750}>1750g</option>
              <option value={2000}>2000g</option>
            </Form.Control>
          </div>
          <Button variant="danger" size='sm' onClick={() => handleRemove(productcart.cart_id)} className='btn'>
            Remove
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="btn"
            onClick={handlePayButtonClick}
          >
            Pay
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CartProduct;
