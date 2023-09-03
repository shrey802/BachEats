/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../css/home.css'; // Import your custom CSS file
import { useNavigate } from 'react-router-dom'
const HomeComponent = () => {
  const navigate = useNavigate();
  const gotoProd = async () => {
    navigate('/products');
  }
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Include any necessary credentials or tokens
      });
      if (response.ok) {
        localStorage.removeItem('sessionUserID');
        // Perform any client-side logout-related actions, such as clearing local storage
        // Redirect to the login page after logout
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  }

  return (
    <div className="main-container">
      <Navbar expand="lg" variant="dark" className="custom-navbar">
        <Container>
          {/* Replace with your site logo or brand image */}
          <Navbar.Brand href="/home">
            <img src="https://i.pinimg.com/originals/58/5a/10/585a10ec06e01b60aadc4dca4c2ddbe6.png" alt="SweetStreaks Logo" className="brand-logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/products">Products</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="background-image">
        <div className="content">
          <h1 className="main-heading">Discover the Sweet Delights</h1>
          <p className="sub-heading">Explore a world of delicious sweets.</p>
          <button className="btn btn-buy-sweets" onClick={gotoProd}>
            Buy Sweets
          </button>
          <p className="tagline">Sweets that melt in your mouth</p>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
