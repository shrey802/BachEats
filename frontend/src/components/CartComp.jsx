/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import CartProduct from './CartProduct';
export default function CartComp() {
    const [cartProducts, setcartProducts] = useState([]);
    useEffect(() => {
        fetchcartProducts();
    }, [])
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
    
    return (
        <div className="cart-product-wrapper">
        {cartProducts.length > 0 ? (
          cartProducts.map((product) => (
            <CartProduct key={product.cart_id} productcart={product} />
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
    </div>
    )
}
