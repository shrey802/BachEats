import React, {useState} from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import '../css/cartproduct.css'; // Import the CartProduct CSS file

const CartProduct = ({ productcart, onRemove, onUpdatePrice }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(250);
  function handleRemove(){
    onRemove(productcart.cart_id)
  }
 
  function handleUpdateQuantityAndPrice() {
    const newPrice = (selectedQuantity / 250) * productcart.price;
    onUpdatePrice(productcart.cart_id, selectedQuantity, newPrice);
  }

  return (
    <div className="cart-product-card">
      <Card key={productcart.product_id}>
        <Card.Img className="card-img-top" variant="top" src={productcart.image_url} />
        <Card.Body>
          <Card.Title>{productcart.product_name}</Card.Title>
          <Card.Text className="description">{productcart.description.slice(0, 50)}...</Card.Text>
          <div className="d-flex justify-content-between align-items-center" id='cart-card-buttons'>
            {/* <div className="price">${productcart.price}</div> */}
            <Form.Control
              as="select"
              value={selectedQuantity}
              onChange={(e) => setSelectedQuantity(parseInt(e.target.value))}
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
            <Button variant="primary" size='sm' className='btn' onClick={handleUpdateQuantityAndPrice}>
              update price
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CartProduct;
