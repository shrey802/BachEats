/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import '../css/cartproduct.css'; // Import the CartProduct CSS file

const CartProduct = ({ productcart, onRemove, onUpdatePriceAndQuantity }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(250);
  const [oldprice, newprice] = useState();
  function handleRemove(){
    onRemove(productcart.cart_id)
  }
 
  return (
    <div className="cart-product-card">
      <Card key={productcart.product_id}>
        <Card.Img className="card-img-top" variant="top" src={productcart.image_url} />
        <Card.Body>
          <Card.Title>{productcart.product_name}</Card.Title>
          <Card.Text className="description">{productcart.description.slice(0, 50)}...</Card.Text>
          <div className="d-flex justify-content-between align-items-center" id='cart-card-buttons'>
            <div className="price">INR {oldprice ? oldprice : productcart.price}</div>
            <Form.Control 
              as="select"
              value={productcart.quantity} // Use the quantity from the cart product
              onChange={(e) => {
                const newSelectedQuantity = parseInt(e.target.value);
                setSelectedQuantity(newSelectedQuantity); // Update the local state
            
                // Calculate the new price based on the selected quantity
                const calculatedPrice = productcart.price * (newSelectedQuantity / 250);
                const formattedPrice = calculatedPrice.toFixed(2);
                newprice(formattedPrice);
                // Update the quantity and price in the parent component
                onUpdatePriceAndQuantity(productcart.cart_id, formattedPrice, newSelectedQuantity);
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
            <Button variant="danger" size='sm' onClick={() => handleRemove(productcart.cart_id)} className='btn'>
              Remove
            </Button>
            <Button variant="primary" size='sm' className='btn'>
              Pay
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CartProduct;
