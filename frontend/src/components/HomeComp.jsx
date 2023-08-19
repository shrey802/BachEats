import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../css/home.css'; // Import your custom CSS file

const HomeComponent = () => {
  return (
    <div className="main-container">
      <Navbar expand="lg" variant="dark" className="custom-navbar">
        <Container>
          <Navbar.Brand href="#home">sweetstreaks</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#products">Products</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#login">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="image-content">
        <button className="btn btn-primary">Buy Sweets</button>
      </div> {/* Background image will be added via CSS */}
    </div>
  );
};

export default HomeComponent;
