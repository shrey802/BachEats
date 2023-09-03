/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import CartProduct from './CartProduct';
import { Button } from 'react-bootstrap';
import '../css/cartproduct.css'
import { useNavigate } from 'react-router-dom';
export default function CartComp() {
  const [cartProducts, setcartProducts] = useState([]);
  useEffect(() => {
    fetchcartProducts();
  }, [cartProducts])

const navigate = useNavigate();
  const handleUpdatedQuantityandPrice = async (cartID, newformattedPrice, newformattedQuantity) => {
    try {
      const response = await fetch('http://localhost:5000/update-cart-item', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart_id: cartID,
          quantity: newformattedQuantity,
          price: newformattedPrice,
        }),
      });

      if (response.ok) {

        const updatedCartProducts = cartProducts.map((product) => {
          if (product.cart_id === cartID) {
            return {
              ...product,
              quantity: newformattedQuantity,
              price: newformattedPrice, // Make sure newPrice is the correct value
            };
          }
          return product;
        });
        setcartProducts(updatedCartProducts);
      } else {
        console.error('Error updating product quantity and price');
      }
    } catch (error) {
      console.error('Error updating product quantity and price:', error);
    }
  };



  const fetchcartProducts = async () => {
    try {

      const sessionUserID = localStorage.getItem('sessionUserID');
      if (!sessionUserID) {
        console.error('User ID not found in localStorage');
        return;
      }

      const response = await fetch(`http://localhost:5000/get-cart?userid=${sessionUserID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'UserID': sessionUserID
        },
      });
      if (response.ok) {
        const data = await response.json();
        setcartProducts(data);
      } else {
        console.error('Error fetching cart products');
      }
    } catch (error) {
      console.error('Error fetching cart products:', error.message);
    }
  }

  const handleRemoveFromCart = async (cart_id) => {
    try {
      const response = await fetch('http://localhost:5000/remove-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart_id: cart_id,
        })
      })
      if (response.ok) {
        console.log('Product removed from cart successfully');
        // Update the cartProducts state to reflect the updated cart
        setcartProducts(cartProducts.filter(product => product.cart_id !== cart_id));
      } else {
        console.error('Error removing item from cart');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  }

function handleredirect(){
  navigate('/products')
}

  return (
    <div className="cart-product-wrapper">

      <button className='backback' onClick={handleredirect}>back to products</button>

      {cartProducts.length > 0 ? (
        <div className="cart-product-grid">
          {cartProducts.map((product) => (
            <CartProduct
              key={product.cart_id}
              productcart={product}
              onRemove={handleRemoveFromCart}
              onUpdatePriceAndQuantity={handleUpdatedQuantityandPrice}
            />
          ))}
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  )
}
