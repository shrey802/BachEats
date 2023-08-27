import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import '../css/products.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const ProductsComponent = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); // State to store cart items

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

  
const navigate = useNavigate();
function gotocart(){
  navigate('/cart');
}

const handleAddToCart = async (product) => {
  try {
    const sessionUserID = localStorage.getItem('sessionUserID');
    if (!sessionUserID) {
      console.error('User ID not found in localStorage');
      return;
    }
    
    const response = await fetch('http://localhost:5000/add-to-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionUserID,
        product_id: product.product_id,
        quantity: 250, // Default quantity in grams
      }),
    });

    if (response.ok) {
      console.log('Product added to cart successfully');
      // Refresh the products or cart after adding
      setCart([...cart, product]);
      fetchProducts();
    } else {
      console.error('Error adding product to cart');
    }
  } catch (error) {
    console.error('Error adding product to cart:', error);
  }
};


  return (
    <div className="product-container">
      <Button variant="primary" size='sm' onClick={gotocart} className='cartview'>View Cart</Button>
      <Row xs={1} sm={2} md={4} className="g-4">
        {products.map((product) => (
          <Col key={product.product_id}>
            <Card className="product-card">
              <Card.Img variant="top" src={product.image_url} />
              <Card.Body>
                <Card.Title>{product.product_name}</Card.Title>
                <Card.Text>{product.description.slice(0, 50)}...</Card.Text>
                <div className="d-flex justify-content-between align-items-center" id='card-buttons'>
                  <div className="price">INR {product.price}</div>
                  <Button variant="primary" size='sm' onClick={() => handleAddToCart(product)}>
                    Add to Cart
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
    </div>
  );
};

export default ProductsComponent;
