import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function ContactComp() {
  const [formData, setFormData] = useState({
    email: '',
    query: ''
  });

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async () => {

    try {
      const response = await fetch('http://localhost:5000/submitQuery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Query submitted successfully
        // You can display a success message or redirect the user
        console.log('query stored successfully');
      } else {
        // Handle error
        console.log('didnt store the query');
      }
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

  return (
    <div className="contact-container" style={{textAlign: 'center'}}>
      <h1>Contact Us</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            style={{ margin: '0 auto', textAlign: 'center', width: 'auto' }}
            type="email"
            required
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="query">
          <Form.Label>Query</Form.Label>
          <Form.Control
          style={{ margin: '0 auto', textAlign: 'center', width: 'auto' }}
            as="textarea"
            rows={5}
            required
            onChange={(e) => handleInputChange('query', e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" style={{marginTop: '15px'}}>
          Submit Query
        </Button>
      </Form>
    </div>
  );
}
