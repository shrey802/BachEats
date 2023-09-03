/* eslint-disable react-hooks/exhaustive-deps */

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
export default function PaymentComp() {
  const { orderAmount } = useParams();
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();
  const [userEmail, setuserEmail] = useState('');
  const [userContact, setuserContact] = useState('');
  const userID = localStorage.getItem('sessionUserID');
  
  
  useEffect(() => {
    // Retrieve user information from local storage

    async function fetchUserDetails() {
      try {

        // Fetch user details based on user ID
        const response = await fetch(`http://localhost:5000/get-user-details`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userID,
          }),
        });
        const userDetails = await response.json();
     
        // Get user's email and contact from userDetails
        const userEmail = userDetails.email;
        const userContact = userDetails.contactnumber;
        setuserEmail(userEmail);
        setuserContact(userContact);
        // Rest of the code to fetch order ID and pre-fill form
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }

    fetchUserDetails();
  }, [orderAmount, userID]);




  useEffect(() => {
    async function fetchOrderId() {
      // Payment order   
      try {
        const response = await fetch(`http://localhost:5000/create-order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderAmount: parseFloat(orderAmount),
          }),
        });
        const data = await response.json();
        setOrderId(data.order_id);
      } catch (error) {
        console.error('Error fetching order ID:', error);
      }
    }
    fetchOrderId();
  }, [orderAmount]);

  useEffect(() => {
    let script;
    if (orderId) {
      script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.setAttribute('data-key', `${process.env.REACT_KEY_ID}`);
      script.setAttribute('data-amount', String(orderAmount * 100));
      script.setAttribute('data-currency', 'INR');
      script.setAttribute('data-order_id', orderId);

      script.async = true;

      script.onload = () => {
        const options = {
          key: process.env.REACT_KEY_ID,
          amount: orderAmount * 100,
          currency: 'INR',
          order_id: orderId,
          name: 'SweetStreaks',
          prefill: {
            email: userEmail,
            contact: userContact,
          },
          handler: (response) => {
          
            if (response.razorpay_payment_id) {
              const form = document.querySelector('.razorpay-payment-form');
              if (form) {
                form.style.display = 'none'; // Hide the form
              }
              // Redirect to the success component
              navigate(`/success`);
            }

          },
        };
        
        const form = new window.Razorpay(options);
        form.open();
        form.on('payment.failed', (response) => {
          // Handle the failed payment here if needed
          console.log('Payment failed:', response.error);
          navigate('/fail');
        });

        // Add custom CSS to hide buttons
        const style = document.createElement('style');
        style.innerHTML = '.razorpay-payment-button { display: none !important; }';
        document.head.appendChild(style);

      };

      document.body.appendChild(script);
    }

    return () => {
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [orderId, orderAmount, navigate]);

  return null;
}




