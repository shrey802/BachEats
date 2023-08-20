/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../css/home.css'; // Import your custom CSS file
import {useNavigate} from 'react-router-dom'
const HomeComponent = () => {
const navigate = useNavigate();
const gotoProd = async () =>{
  navigate('/products');
}
const handleLogout = async() => {
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
          <Navbar.Brand href="/home">sweetstreaks</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/products">Products</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="image-content">
        <button className="btn btn-primary" onClick={gotoProd}>Buy Sweets</button>
      </div> {/* Background image will be added via CSS */}
    </div>
  );
};

export default HomeComponent;
