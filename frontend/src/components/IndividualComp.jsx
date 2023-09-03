import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/individual-sweet.css'; // Import your custom CSS for styling

const IndividualSweet = () => {
  // handles all the individual sweet information
  const { id } = useParams();
  const [sweet, setSweet] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchSweet() {
      try {
        const response = await fetch(`http://localhost:5000/getSweet/${id}`);
        if (response.ok) {
          const data = await response.json();
          setSweet(data);
        } else {
          console.error('Failed to fetch sweet');
        }
      } catch (error) {
        console.error('Error fetching sweet:', error.message);
      }
    }
    fetchSweet();
  }, [id]);

function handleBackToProducts(){
  navigate('/products');
}

  return (
    <div className="individual-sweet-container">
      <button onClick={handleBackToProducts} className="back-button">
        Back to Products
      </button>
      {sweet ? (
        <div className="sweet-details">
          <div className="sweet-header">
            <h2 className="sweet-title">{sweet.product_name}</h2>
            <p className="sweet-price">Price: INR {sweet.price}</p>
          </div>
          <img src={sweet.image_url} alt={sweet.product_name} className="sweet-image" />
          <p className="sweet-description">{sweet.description}</p>
        </div>
      ) : (
        <p className="loading-message">Loading sweet details...</p>
      )}
    </div>
  );
};

export default IndividualSweet;
