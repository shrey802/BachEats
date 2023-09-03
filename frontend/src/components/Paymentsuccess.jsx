/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Success() {
  const navigate = useNavigate();
  const productID = localStorage.getItem('prodID');
  const userID = localStorage.getItem('sessionUserID');
  const quantity = localStorage.getItem('selectedQuantity');
  const [userData, setUserData] = useState(null);
  const [productData, setProductData] = useState(null);
  const [isReadyToCreateOrder, setIsReadyToCreateOrder] = useState(false);

  useEffect(() => {
    async function fetchAllUserData() {
      try {
        const response = await fetch('http://localhost:5000/getdataofuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userID: userID,
          }),
        });
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllUserData();
  }, [userID]);



  useEffect(() => {
    async function fetchProductData() {
      try {
        const response = await fetch('http://localhost:5000/getproductdata', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productID: productID,
          }),
        });
        const data = await response.json();
        setProductData(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProductData();
  }, [productID]);

  useEffect(() => {
    if (userData && productData) {
      setIsReadyToCreateOrder(true);
    }
  }, [userData, productData]);

  const handleStoreOrder = async () => {
    try {
      if (!isReadyToCreateOrder) {
        return; // Return if data is not ready yet
      }

      // Send a request to your backend API to store the order
      const response = await fetch('http://localhost:5000/store-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID: userID, // Retrieve user ID from local storage
          productID: productID,
          productPrice: productData.price,
          quantity: quantity,
          address: userData.address,
          contact: userData.contactnumber,
        }),
      });

      if (response.ok) {
        // Order stored successfully, redirect to success page
        
        navigate('/products');
        alert('Your order was successfully stored and placed! Thank You')
        console.log('stored order successfully');
      } else {
        // Handle error here, show an error message or redirect to an error page
        navigate('/fail');
      }
    } catch (error) {
      console.error('Error storing order:', error);

      // Handle error here
    }
  };

  useEffect(() => {
    handleStoreOrder();
  }, [userData]);

  return (
    <div>
      Payment is successful & Sending your mail.
    </div>
  );
}
