import React from 'react';
import { Nav, Grid, Row, Col } from 'rsuite';
import '../css/home.css';
import HomeIcon from '@rsuite/icons/legacy/Home';

export default function HomeComp() {
  return (
    <div className='navbar-container'>
      <Grid fluid>
        <Row className='show-grid'>
          <Col xs={24} sm={8}>
            <Nav vertical>
              <Nav.Item icon={<HomeIcon />}>Home</Nav.Item>
              <Nav.Item>Contact</Nav.Item>
              <Nav.Item>Products</Nav.Item>
              <Nav.Item>About</Nav.Item>
            </Nav>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}
